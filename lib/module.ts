import { DynamicModule, Provider } from "@nestjs/common";
import knex from "knex";
import { Model } from "objection";
import {
  KNEX_CONNECTION_PROVIDER,
  OBJECTION_BASE_MODEL_PROVIDER,
  OBJECTION_MODULE_OPTIONS_PROVIDER
} from "./constants";
import {
  Connection,
  ObjectionModuleAsyncOptions,
  ObjectionModuleOptions,
  ObjectionModuleOptionsFactory
} from "./interfaces";

export class ObjectionCoreModule {
  public static forRoot(options: ObjectionModuleOptions): DynamicModule {
    const knexConfig = options.config || {};
    const Base = options.Model || Model;
    const connection = knex(knexConfig);

    Base.knex(connection);

    const objectionModuleOptions: Provider = {
      provide: OBJECTION_MODULE_OPTIONS_PROVIDER,
      useValue: options
    };

    const objectionBaseModelProvider: Provider = {
      provide: OBJECTION_BASE_MODEL_PROVIDER,
      useValue: Base
    };

    const knexConnectionProvider: Provider = {
      provide: KNEX_CONNECTION_PROVIDER,
      useValue: connection
    };

    return {
      module: ObjectionCoreModule,
      providers: [
        objectionModuleOptions,
        objectionBaseModelProvider,
        knexConnectionProvider
      ],
      exports: [objectionBaseModelProvider, knexConnectionProvider]
    };
  }

  public static forRootAsync(
    options: ObjectionModuleAsyncOptions
  ): DynamicModule {
    const knexConnectionProvider: Provider = {
      provide: KNEX_CONNECTION_PROVIDER,
      inject: [OBJECTION_MODULE_OPTIONS_PROVIDER],
      useFactory(objectionModuleOptions: ObjectionModuleOptions) {
        const config = objectionModuleOptions.config || {};

        return knex(config);
      }
    };

    const objectionBaseModelProvider: Provider = {
      provide: OBJECTION_BASE_MODEL_PROVIDER,
      inject: [KNEX_CONNECTION_PROVIDER, OBJECTION_MODULE_OPTIONS_PROVIDER],
      useFactory(
        connection: Connection,
        objectionModuleOptions: ObjectionModuleOptions
      ) {
        const Base = objectionModuleOptions.Model || Model;

        return Base.knex(connection);
      }
    };
    const asyncProviders = this.createAsyncProviders(options);

    return {
      module: ObjectionCoreModule,
      imports: options.imports,
      providers: [
        ...asyncProviders,
        knexConnectionProvider,
        objectionBaseModelProvider
      ],
      exports: [objectionBaseModelProvider, knexConnectionProvider]
    };
  }

  private static createAsyncProviders(
    options: ObjectionModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    if (!options.useClass) {
      throw new Error("Invalid configuration");
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: ObjectionModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: OBJECTION_MODULE_OPTIONS_PROVIDER,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }

    return {
      provide: OBJECTION_MODULE_OPTIONS_PROVIDER,
      useFactory(optionsFactory: ObjectionModuleOptionsFactory) {
        return optionsFactory.createObjectionModuleOptions();
      },
      inject: [options.useClass || options.useExisting]
    };
  }
}
