/* eslint-disable new-cap */
import { DynamicModule, Logger, Module } from "@nestjs/common";
import { ObjectionCoreModule } from "./core";
import {
  ObjectionModuleAsyncOptions,
  ObjectionModuleOptions,
} from "./interfaces";

@Module({})
export class ObjectionModule {
  public static forRoot(options: ObjectionModuleOptions): DynamicModule {
    Logger.warn(
      "ObjectionModule#forRoot has been deprecated and will be removed in the next major version. Please use ObjectionModule#register instead.",
    );
    return ObjectionModule.register(options);
  }

  public static register(options: ObjectionModuleOptions): DynamicModule {
    return {
      module: ObjectionModule,
      imports: [ObjectionCoreModule.register(options)],
      exports: [ObjectionCoreModule],
    };
  }

  public static forRootAsync(
    options: ObjectionModuleAsyncOptions,
  ): DynamicModule {
    Logger.warn(
      "ObjectionModule#forRootAsync has been deprecated and will be removed in the next major version. Please use ObjectionModule#registerAsync instead.",
    );

    return ObjectionModule.registerAsync(options);
  }

  public static registerAsync(
    options: ObjectionModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: ObjectionModule,
      imports: [ObjectionCoreModule.registerAsync(options)],
      exports: [ObjectionCoreModule],
    };
  }
}
