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
import { knex, Knex } from "knex";
import { Model } from "objection";
import {
  KNEX_CONNECTION,
  OBJECTION_BASE_MODEL,
  OBJECTION_MODULE_OPTIONS,
} from "./constants";
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
      providers: [
        objectionModuleOptions,
        objectionBaseModelProvider,
        knexConnectionProvider,
      ],
      exports: [objectionBaseModelProvider, knexConnectionProvider],
    };
  }

  public static registerAsync(
    options: ObjectionModuleAsyncOptions = {},
  ): DynamicModule {
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
      providers: [
        ...asyncProviders,
        knexConnectionProvider,
        objectionBaseModelProvider,
      ],
      exports: [objectionBaseModelProvider, knexConnectionProvider],
    };
  }

  private static createAsyncProviders(
    options: ObjectionModuleAsyncOptions,
  ): Provider[] {
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

  private static createAsyncOptionsProvider(
    options: ObjectionModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: OBJECTION_MODULE_OPTIONS,
        // eslint-disable-next-line @typescript-eslint/unbound-method
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = options.useClass || options.useExisting;

    if (!inject) {
      throw new Error(
        "Invalid configuration. Must provide useFactory, useClass or useExisting",
      );
    }

    return {
      provide: OBJECTION_MODULE_OPTIONS,
      async useFactory(
        optionsFactory: ObjectionModuleOptionsFactory,
      ): Promise<ObjectionModuleOptions> {
        const opts = await optionsFactory.createObjectionModuleOptions(
          options.name,
        );

        return opts;
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
