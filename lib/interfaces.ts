import { Type } from "@nestjs/common";
import { ModuleMetadata } from "@nestjs/common/interfaces";
import * as Knex from "knex";
import { Model } from "objection";

export interface ObjectionModuleOptions {
  Model?: typeof Model;
  config: Knex.Config;
}

export interface ObjectionModuleOptionsFactory {
  createObjectionModuleOptions():
    | Promise<ObjectionModuleOptions>
    | ObjectionModuleOptions;
}

export interface ObjectionModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useExisting?: Type<ObjectionModuleOptionsFactory>;
  useClass?: Type<ObjectionModuleOptionsFactory>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject?: any[];
  useFactory?(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ): Promise<ObjectionModuleOptions> | ObjectionModuleOptions;
}

export type Connection = Knex;
