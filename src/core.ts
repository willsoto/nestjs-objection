import {
  DynamicModule,
  FactoryProvider,
  Global,
  Inject,
  Module,
  OnApplicationShutdown,
  Provider,
  ValueProvider,
} from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Knex, knex } from "knex";
import { Model } from "objection";

import { KNEX_CONNECTION, OBJECTION_BASE_MODEL, OBJECTION_MODULE_OPTIONS } from "./constants";
import {
  Connection,
  ObjectionModuleAsyncOptions,
  ObjectionModuleOptions,
  ObjectionModuleOptionsFactory,
} from "./interfaces";

@Global()
@Module({})
export class ObjectionCoreModule implements OnApplicationShutdown {
  constructor(
    @Inject(OBJECTION_MODULE_OPTIONS)
    private options: ObjectionModuleOptions,
    private moduleRef: ModuleRef,
  ) {}

  public static register(options: ObjectionModuleOptions): DynamicModule {
    const BaseModel = options.Model || Model;
    const connection = knex(options.config);

    BaseModel.knex(connection);

    const objectionModuleOptions: ValueProvider = {
      provide: OBJECTION_MODULE_OPTIONS,
      useValue: options,
    };

    const objectionBaseModelProvider: ValueProvider = {
      provide: BaseModel,
      useValue: BaseModel,
    };

    const knexConnectionProvider: ValueProvider = {
      provide: options.name || KNEX_CONNECTION,
      useValue: connection,
    };

    return {
      module: ObjectionCoreModule,
      providers: [objectionModuleOptions, objectionBaseModelProvider, knexConnectionProvider],
      exports: [objectionBaseModelProvider, knexConnectionProvider],
    };
  }

  public static registerAsync(options: ObjectionModuleAsyncOptions = {}): DynamicModule {
    const connectionToken = options.name || KNEX_CONNECTION;

    const knexConnectionProvider: FactoryProvider = {
      provide: connectionToken,
      inject: [OBJECTION_MODULE_OPTIONS],
      useFactory(objectionModuleOptions: ObjectionModuleOptions): Knex {
        return knex(objectionModuleOptions.config);
      },
    };

    const objectionBaseModelProvider: FactoryProvider = {
      provide: OBJECTION_BASE_MODEL,
      inject: [connectionToken, OBJECTION_MODULE_OPTIONS],
      useFactory(
        connection: Connection,
        objectionModuleOptions: ObjectionModuleOptions,
      ): typeof Model {
        const BaseModel = objectionModuleOptions.Model || Model;

        BaseModel.knex(connection);

        return BaseModel;
      },
    };
    const asyncProviders = this.createAsyncProviders(options);

    return {
      module: ObjectionCoreModule,
      imports: options.imports,
      providers: [...asyncProviders, knexConnectionProvider, objectionBaseModelProvider],
      exports: [objectionBaseModelProvider, knexConnectionProvider],
    };
  }

  private static createAsyncProviders(options: ObjectionModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    } else if (!options.useClass) {
      throw new Error("Invalid configuration");
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  // The connection is registered under the `name` given to `registerAsync`, so
  // it must win over whatever the factory returns or shutdown can't find it.
  private static createAsyncOptionsProvider(options: ObjectionModuleAsyncOptions): Provider {
    const { name } = options;

    if (options.useFactory) {
      const factory = options.useFactory.bind(options);

      return {
        provide: OBJECTION_MODULE_OPTIONS,
        async useFactory(...args: unknown[]): Promise<ObjectionModuleOptions> {
          return { ...(await factory(...args)), name };
        },
        inject: options.inject || [],
      };
    }

    const inject = options.useClass || options.useExisting;

    if (!inject) {
      throw new Error("Invalid configuration. Must provide useFactory, useClass or useExisting");
    }

    return {
      provide: OBJECTION_MODULE_OPTIONS,
      async useFactory(
        optionsFactory: ObjectionModuleOptionsFactory,
      ): Promise<ObjectionModuleOptions> {
        return { ...(await optionsFactory.createObjectionModuleOptions(name)), name };
      },
      inject: [inject],
    };
  }

  async onApplicationShutdown(): Promise<void> {
    await this.disconnect();
  }

  private async disconnect(): Promise<void> {
    const name = this.options.name || KNEX_CONNECTION;
    const connection = this.moduleRef.get<Connection>(name);

    await connection.destroy();
  }
}
