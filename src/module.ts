/* eslint-disable new-cap */
import { DynamicModule, Module, Provider } from "@nestjs/common";
import { Model } from "objection";
import { ObjectionCoreModule } from "./core";
import {
  ObjectionModuleAsyncOptions,
  ObjectionModuleOptions,
} from "./interfaces";

@Module({})
export class ObjectionModule {
  public static register(options: ObjectionModuleOptions): DynamicModule {
    return {
      module: ObjectionModule,
      imports: [ObjectionCoreModule.register(options)],
      exports: [ObjectionCoreModule],
    };
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

  public static forFeature(models: typeof Model[]): DynamicModule {
    const modelProviders: Provider[] = models.flatMap((model) => {
      return [
        {
          useValue: model,
          provide: model,
        },
        {
          useValue: model,
          provide: model.name,
        },
      ];
    });

    return {
      module: ObjectionModule,
      providers: modelProviders,
      exports: modelProviders,
    };
  }
}
