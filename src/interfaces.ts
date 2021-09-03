import { Type } from "@nestjs/common";
import { ModuleMetadata } from "@nestjs/common/interfaces";
import { Knex } from "knex";
import { Model } from "objection";
export interface ObjectionModuleOptions {
  /**
   * The name for this connection if more than one database connection is required.
   * This field is **required** if you use multiple connetions.
   */
  name?: string;
  Model?: typeof Model;
  config: Knex.Config;
}

export interface ObjectionModuleOptionsFactory {
  createObjectionModuleOptions(
    connectionName?: string,
  ): Promise<ObjectionModuleOptions> | ObjectionModuleOptions;
}

export interface ObjectionModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  /**
   * The name for this connection if more than one database connection is required.
   * This field is **required** if you use multiple connetions.
   */
  name?: ObjectionModuleOptions["name"];
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
