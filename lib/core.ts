/* eslint-disable new-cap */
import { DynamicModule, Module, Provider } from "@nestjs/common";
import Knex from "knex";
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

@Module({})
export class ObjectionCoreModule {
  public static register(options: ObjectionModuleOptions): DynamicModule {
    const BaseModel = options.Model || Model;
    const connection = Knex(options.config);

    BaseModel.knex(connection);

    const objectionModuleOptions: Provider = {
      provide: OBJECTION_MODULE_OPTIONS,
      useValue: options,
    };

    const objectionBaseModelProvider: Provider = {
      provide: OBJECTION_BASE_MODEL,
      useValue: BaseModel,
    };

    const knexConnectionProvider: Provider = {
      provide: KNEX_CONNECTION,
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
    const knexConnectionProvider: Provider = {
      provide: KNEX_CONNECTION,
      inject: [OBJECTION_MODULE_OPTIONS],
      useFactory(objectionModuleOptions: ObjectionModuleOptions): Knex {
        return Knex(objectionModuleOptions.config);
      },
    };

    const objectionBaseModelProvider: Provider = {
      provide: OBJECTION_BASE_MODEL,
      inject: [KNEX_CONNECTION, OBJECTION_MODULE_OPTIONS],
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

  public static createAsyncProviders(
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

  public static createAsyncOptionsProvider(
    options: ObjectionModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: OBJECTION_MODULE_OPTIONS,
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
        const opts = await optionsFactory.createObjectionModuleOptions();

        return opts;
      },
      inject: [inject],
    };
  }
}
