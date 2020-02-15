import {
  KNEX_CONNECTION,
  OBJECTION_BASE_MODEL,
  OBJECTION_MODULE_OPTIONS
} from "@/constants";
import { ObjectionCoreModule } from "@/core";
import {
  ObjectionModuleOptions,
  ObjectionModuleOptionsFactory
} from "@/interfaces";
import { Injectable } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import knex from "knex";

describe("ObjectionCoreModule", () => {
  let testingModule: TestingModule;
  const config: knex.Config = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./testing.sqlite"
    }
  };

  describe("#register", () => {
    beforeEach(async () => {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionCoreModule.register({
            config
          })
        ]
      }).compile();
    });

    test("provides a connection", () => {
      const connection = testingModule.get("KnexConnection");

      expect(connection).toBeDefined();
    });

    test("provides a base model", () => {
      const model = testingModule.get("ObjectionBaseModel");

      expect(model).toBeDefined();
    });
  });

  describe("#registerAsync", () => {
    beforeEach(async () => {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionCoreModule.registerAsync({
            useFactory() {
              return {
                config
              };
            }
          })
        ]
      }).compile();
    });

    test("provides a connection", () => {
      const connection = testingModule.get(KNEX_CONNECTION);

      expect(connection).toBeDefined();
    });

    test("provides a base model", () => {
      const model = testingModule.get(OBJECTION_BASE_MODEL);

      expect(model).toBeDefined();
    });
  });

  describe("#createAsyncProviders", () => {
    class ModuleOptionsFactory implements ObjectionModuleOptionsFactory {
      public createObjectionModuleOptions(): ObjectionModuleOptions {
        return {
          config
        };
      }
    }

    test("throws an error if options.useClass, useExisting, useFactory are not provided", () => {
      expect(() => {
        ObjectionCoreModule.createAsyncProviders({});
      }).toThrowError("Invalid configuration");
    });

    test("leverages useClass if provided", () => {
      const providers = ObjectionCoreModule.createAsyncProviders({
        useClass: ModuleOptionsFactory
      });

      expect(providers).toEqual([
        {
          inject: [ModuleOptionsFactory],
          useFactory: expect.any(Function),
          provide: OBJECTION_MODULE_OPTIONS
        },
        {
          useClass: ModuleOptionsFactory,
          provide: ModuleOptionsFactory
        }
      ]);
    });

    test("returns an array of providers when useExisting is passed", () => {
      const providers = ObjectionCoreModule.createAsyncProviders({
        useExisting: ModuleOptionsFactory
      });

      expect(providers).toEqual([
        {
          inject: [ModuleOptionsFactory],
          useFactory: expect.any(Function),
          provide: OBJECTION_MODULE_OPTIONS
        }
      ]);
    });

    test("returns an array of providers when useFactory is passed", () => {
      const providers = ObjectionCoreModule.createAsyncProviders({
        useFactory: () => ({
          config
        })
      });

      expect(providers).toEqual([
        {
          inject: [],
          useFactory: expect.any(Function),
          provide: OBJECTION_MODULE_OPTIONS
        }
      ]);
    });
  });

  describe("#createAsyncOptionsProvider", () => {
    // eslint-disable-next-line new-cap
    @Injectable()
    class ModuleOptionsFactory implements ObjectionModuleOptionsFactory {
      public createObjectionModuleOptions(): ObjectionModuleOptions {
        return {
          config
        };
      }
    }

    test("returns the appropriate provider when useFactory is passed", () => {
      const provider = ObjectionCoreModule.createAsyncOptionsProvider({
        useFactory: () => ({
          config
        })
      });

      expect(provider).toEqual({
        inject: [],
        provide: OBJECTION_MODULE_OPTIONS,
        useFactory: expect.any(Function)
      });
    });

    test("returns the appropriate provider when useExisting is passed", () => {
      const provider = ObjectionCoreModule.createAsyncOptionsProvider({
        useExisting: ModuleOptionsFactory
      });

      expect(provider).toEqual({
        inject: [ModuleOptionsFactory],
        provide: OBJECTION_MODULE_OPTIONS,
        useFactory: expect.any(Function)
      });
    });

    test("returns an async factory function that calls createObjectionModuleOptions", async () => {
      jest.spyOn(
        ModuleOptionsFactory.prototype,
        "createObjectionModuleOptions"
      );

      await Test.createTestingModule({
        imports: [
          ObjectionCoreModule.registerAsync({
            useClass: ModuleOptionsFactory
          })
        ]
      }).compile();

      expect(
        ModuleOptionsFactory.prototype.createObjectionModuleOptions
      ).toHaveBeenCalled();
    });
  });
});
