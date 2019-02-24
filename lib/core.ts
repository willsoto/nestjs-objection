import { DynamicModule, Provider } from "@nestjs/common";
import Knex from "knex";
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
  public static forRoot(options: ObjectionModuleOptions): DynamicModule {
    const BaseModel = options.Model || Model;
    // eslint-disable-next-line new-cap
    const connection = Knex(options.config);

    BaseModel.knex(connection);

    const objectionModuleOptions: Provider = {
      provide: OBJECTION_MODULE_OPTIONS,
      useValue: options
    };

    const objectionBaseModelProvider: Provider = {
      provide: OBJECTION_BASE_MODEL,
      useValue: BaseModel
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
        // eslint-disable-next-line new-cap
        return Knex(objectionModuleOptions.config);
      }
    };

    const objectionBaseModelProvider: Provider = {
      provide: OBJECTION_BASE_MODEL,
      inject: [KNEX_CONNECTION, OBJECTION_MODULE_OPTIONS],
      useFactory(
        connection: Connection,
        objectionModuleOptions: ObjectionModuleOptions
      ) {
        const BaseModel = objectionModuleOptions.Model || Model;

        BaseModel.knex(connection);

        return BaseModel;
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

  public static createAsyncProviders(
    options: ObjectionModuleAsyncOptions
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
        useClass: options.useClass
      }
    ];
  }

  public static createAsyncOptionsProvider(
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
