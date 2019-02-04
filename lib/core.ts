import { DynamicModule, Provider } from "@nestjs/common";
import knex from "knex";
import { Model } from "objection";
import {
  KNEX_CONNECTION,
  OBJECTION_BASE_MODEL,
  OBJECTION_MODULE_OPTIONS
} from "./constants";
import {
  Connection,
  ObjectionModuleAsyncOptions,
  ObjectionModuleOptions,
  ObjectionModuleOptionsFactory
} from "./interfaces";

export class ObjectionCoreModule {
  public static forRoot(options: ObjectionModuleOptions = {}): DynamicModule {
    const knexConfig = options.config || {};
    const Base = options.Model || Model;
    const connection = knex(knexConfig);

    Base.knex(connection);

    const objectionModuleOptions: Provider = {
      provide: OBJECTION_MODULE_OPTIONS,
      useValue: options
    };

    const objectionBaseModelProvider: Provider = {
      provide: OBJECTION_BASE_MODEL,
      useValue: Base
    };

    const knexConnectionProvider: Provider = {
      provide: KNEX_CONNECTION,
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
    options: ObjectionModuleAsyncOptions = {}
  ): DynamicModule {
    const knexConnectionProvider: Provider = {
      provide: KNEX_CONNECTION,
      inject: [OBJECTION_MODULE_OPTIONS],
      useFactory(objectionModuleOptions: ObjectionModuleOptions) {
        const config = objectionModuleOptions.config || {};

        return knex(config);
      }
    };

    const objectionBaseModelProvider: Provider = {
      provide: OBJECTION_BASE_MODEL,
      inject: [KNEX_CONNECTION, OBJECTION_MODULE_OPTIONS],
      useFactory(
        connection: Connection,
        objectionModuleOptions: ObjectionModuleOptions
      ) {
        const Base = objectionModuleOptions.Model || Model;

        Base.knex(connection);

        return Base;
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
        provide: OBJECTION_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }

    return {
      provide: OBJECTION_MODULE_OPTIONS,
      async useFactory(optionsFactory: ObjectionModuleOptionsFactory) {
        const opts = await optionsFactory.createObjectionModuleOptions();

        return opts;
      },
      inject: [options.useClass || options.useExisting]
    };
  }
}
