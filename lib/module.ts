import { DynamicModule, Module } from "@nestjs/common";
import { ObjectionCoreModule } from "./core";
import {
  ObjectionModuleAsyncOptions,
  ObjectionModuleOptions
} from "./interfaces";

// eslint-disable-next-line new-cap
@Module({})
export class ObjectionModule {
  public static forRoot(options?: ObjectionModuleOptions): DynamicModule {
    return {
      module: ObjectionModule,
      imports: [ObjectionCoreModule.forRoot(options)]
    };
  }

  public static forRootAsync(
    options: ObjectionModuleAsyncOptions
  ): DynamicModule {
    return {
      module: ObjectionModule,
      imports: [ObjectionCoreModule.forRootAsync(options)]
    };
  }
}
