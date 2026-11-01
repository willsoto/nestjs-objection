import { Injectable, ModuleMetadata } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Knex } from "knex";
import { Model } from "objection";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { KNEX_CONNECTION, OBJECTION_BASE_MODEL, OBJECTION_MODULE_OPTIONS } from "../src/constants";
import { ObjectionCoreModule } from "../src/core";
import { ObjectionModuleOptions, ObjectionModuleOptionsFactory } from "../src/interfaces";

describe("ObjectionCoreModule", function () {
  let testingModule: TestingModule;

  const config: Knex.Config = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./testing.sqlite",
    },
  };

  describe("#register", function () {
    beforeAll(async function () {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionCoreModule.register({
            config,
          }),
        ],
      }).compile();
    });

    afterAll(function () {
      return testingModule.close();
    });

    it("provides a connection", function () {
      const connection = testingModule.get<Knex>("KnexConnection");

      expect(connection).toBeTruthy();
    });

    it("provides a base model", function () {
      const model = testingModule.get(Model);

      expect(model).toBe(Model);
    });
  });

  describe("#registerAsync", function () {
    beforeAll(async function () {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionCoreModule.registerAsync({
            useFactory() {
              return {
                config,
              };
            },
          }),
        ],
      }).compile();
    });

    afterAll(function () {
      return testingModule.close();
    });

    it("provides a connection", function () {
      const connection = testingModule.get<Knex>(KNEX_CONNECTION);

      expect(connection).toBeTruthy();
    });

    it("provides a base model", function () {
      const model = testingModule.get<Model>(OBJECTION_BASE_MODEL);

      expect(model).toBe(Model);
    });
  });

  describe("#createAsyncProviders", function () {
    class ModuleOptionsFactory implements ObjectionModuleOptionsFactory {
      public createObjectionModuleOptions(): ObjectionModuleOptions {
        return {
          config,
        };
      }
    }

    it("throws an error if options.useClass, useExisting, useFactory are not provided", function () {
      expect(() => {
        ObjectionCoreModule["createAsyncProviders"]({});
      }).toThrow("Invalid configuration");
    });

    it("leverages useClass if provided", function () {
      const providers = ObjectionCoreModule["createAsyncProviders"]({
        useClass: ModuleOptionsFactory,
      });

      expect(providers).toBeInstanceOf(Array);
      expect(providers).toHaveLength(2);

      expect(providers[0]).toHaveProperty("inject", [ModuleOptionsFactory]);
      expect(providers[0]).toHaveProperty("provide", OBJECTION_MODULE_OPTIONS);

      expect(providers[1]).toHaveProperty("useClass", ModuleOptionsFactory);
      expect(providers[1]).toHaveProperty("provide", ModuleOptionsFactory);
    });

    it("returns an array of providers when useExisting is passed", function () {
      const providers = ObjectionCoreModule["createAsyncProviders"]({
        useExisting: ModuleOptionsFactory,
      });

      expect(providers).toBeInstanceOf(Array);
      expect(providers).toHaveLength(1);

      expect(providers[0]).toHaveProperty("inject", [ModuleOptionsFactory]);
      expect(providers[0]).toHaveProperty("provide", OBJECTION_MODULE_OPTIONS);
    });

    it("returns an array of providers when useFactory is passed", function () {
      const providers = ObjectionCoreModule["createAsyncProviders"]({
        useFactory: () => ({
          config,
        }),
      });

      expect(providers).toBeInstanceOf(Array);
      expect(providers).toHaveLength(1);

      expect(providers[0]).toHaveProperty("inject", []);
      expect(providers[0]).toHaveProperty("provide", OBJECTION_MODULE_OPTIONS);
    });
  });

  describe("#createAsyncOptionsProvider", function () {
    @Injectable()
    class ModuleOptionsFactory implements ObjectionModuleOptionsFactory {
      public createObjectionModuleOptions(): ObjectionModuleOptions {
        return {
          config,
        };
      }
    }

    it("returns the appropriate provider when useFactory is passed", function () {
      const provider = ObjectionCoreModule["createAsyncOptionsProvider"]({
        useFactory: () => ({
          config,
        }),
      });

      expect(provider).toHaveProperty("inject", []);
      expect(provider).toHaveProperty("provide", OBJECTION_MODULE_OPTIONS);
    });

    it("returns the appropriate provider when useExisting is passed", function () {
      const provider = ObjectionCoreModule["createAsyncOptionsProvider"]({
        useExisting: ModuleOptionsFactory,
      });

      expect(provider).toHaveProperty("inject", [ModuleOptionsFactory]);
      expect(provider).toHaveProperty("provide", OBJECTION_MODULE_OPTIONS);
    });

    it("returns an async factory function that calls createObjectionModuleOptions", async function () {
      vi.spyOn(ModuleOptionsFactory.prototype, "createObjectionModuleOptions");

      await Test.createTestingModule({
        imports: [
          ObjectionCoreModule.registerAsync({
            useClass: ModuleOptionsFactory,
          }),
        ],
      }).compile();

      expect(ModuleOptionsFactory.prototype.createObjectionModuleOptions).toHaveBeenCalled();
    });
  });
  describe("on shutdown", function () {
    const memoryConfig: Knex.Config = {
      client: "sqlite3",
      useNullAsDefault: true,
      connection: { filename: ":memory:" },
    };

    async function closeAndGetConnection(
      imports: ModuleMetadata["imports"],
      token = KNEX_CONNECTION,
    ): Promise<Knex> {
      const module = await Test.createTestingModule({ imports }).compile();
      const connection = module.get<Knex>(token);

      await module.close();

      return connection;
    }

    it("destroys the connection created by register", async function () {
      const connection = await closeAndGetConnection([
        ObjectionCoreModule.register({ config: memoryConfig }),
      ]);

      await expect(connection.raw("select 1")).rejects.toThrow();
    });

    it("destroys the connection created by registerAsync", async function () {
      const connection = await closeAndGetConnection([
        ObjectionCoreModule.registerAsync({ useFactory: () => ({ config: memoryConfig }) }),
      ]);

      await expect(connection.raw("select 1")).rejects.toThrow();
    });

    it("destroys a named registerAsync connection when the factory omits the name", async function () {
      const connection = await closeAndGetConnection(
        [
          ObjectionCoreModule.registerAsync({
            name: "named",
            useFactory: () => ({ config: memoryConfig }),
          }),
        ],
        "named",
      );

      await expect(connection.raw("select 1")).rejects.toThrow();
    });

    it("destroys a named registerAsync connection when useClass returns no name", async function () {
      @Injectable()
      class OptionsFactory implements ObjectionModuleOptionsFactory {
        createObjectionModuleOptions(): ObjectionModuleOptions {
          return { config: memoryConfig };
        }
      }

      const connection = await closeAndGetConnection(
        [ObjectionCoreModule.registerAsync({ name: "named", useClass: OptionsFactory })],
        "named",
      );

      await expect(connection.raw("select 1")).rejects.toThrow();
    });

    it("destroys an unnamed registerAsync connection when the factory returns a name", async function () {
      const connection = await closeAndGetConnection([
        ObjectionCoreModule.registerAsync({
          useFactory: () => ({ name: "ignored", config: memoryConfig }),
        }),
      ]);

      await expect(connection.raw("select 1")).rejects.toThrow();
    });
  });
});
