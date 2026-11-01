import { Injectable, Module } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Knex } from "knex";
import { Model } from "objection";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { KNEX_CONNECTION, OBJECTION_BASE_MODEL } from "../src/constants";
import { ObjectionModuleOptions, ObjectionModuleOptionsFactory } from "../src/interfaces";
import { ObjectionModule } from "../src/module";
import { User } from "./fixtures";

describe("ObjectionModule", function () {
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
          ObjectionModule.register({
            config,
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
      const model = testingModule.get(Model);

      expect(model).toBeTruthy();
    });
  });

  describe("#registerAsync", function () {
    beforeAll(async function () {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionModule.registerAsync({
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
      const connection = testingModule.get<Knex>("KnexConnection");

      expect(connection).toBeTruthy();
    });

    it("provides a base model", function () {
      const model = testingModule.get<Model>("ObjectionBaseModel");

      expect(model).toBe(Model);
    });
  });

  describe("#registerAsync options sources", function () {
    const memoryConfig: Knex.Config = {
      client: "sqlite3",
      useNullAsDefault: true,
      connection: { filename: ":memory:" },
    };

    @Injectable()
    class OptionsFactory implements ObjectionModuleOptionsFactory {
      createObjectionModuleOptions(): ObjectionModuleOptions {
        return { config: memoryConfig };
      }
    }

    @Module({ providers: [OptionsFactory], exports: [OptionsFactory] })
    class OptionsModule {}

    afterEach(function () {
      return testingModule.close();
    });

    it("builds a working connection from useClass", async function () {
      testingModule = await Test.createTestingModule({
        imports: [ObjectionModule.registerAsync({ useClass: OptionsFactory })],
      }).compile();

      const connection = testingModule.get<Knex>(KNEX_CONNECTION);

      await expect(connection.raw("select 1 as ok")).resolves.toEqual([{ ok: 1 }]);
    });

    it("builds a working connection from useExisting", async function () {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionModule.registerAsync({ imports: [OptionsModule], useExisting: OptionsFactory }),
        ],
      }).compile();

      const connection = testingModule.get<Knex>(KNEX_CONNECTION);

      await expect(connection.raw("select 1 as ok")).resolves.toEqual([{ ok: 1 }]);
    });

    it("binds a custom base model to the connection", async function () {
      class BaseModel extends Model {}

      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionModule.registerAsync({
            useFactory: () => ({ Model: BaseModel, config: memoryConfig }),
          }),
        ],
      }).compile();

      expect(testingModule.get(OBJECTION_BASE_MODEL)).toBe(BaseModel);
      expect(BaseModel.knex()).toBe(testingModule.get(KNEX_CONNECTION));
    });
  });

  describe("#forFeature", function () {
    beforeAll(async function () {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionModule.register({
            config: { ...config, connection: { filename: ":memory:" } },
          }),
          ObjectionModule.forFeature([User]),
        ],
      }).compile();

      await testingModule.get<Knex>(KNEX_CONNECTION).schema.createTable(User.tableName, (t) => {
        t.increments();
        t.text("name");
      });
    });

    afterAll(function () {
      return testingModule.close();
    });

    it("provides a model by token", function () {
      const model = testingModule.get(User);

      expect(model).toEqual(User);
    });

    it("provides a model by string name", function () {
      const model = testingModule.get<User>("User");

      expect(model).toEqual(User);
    });

    it("provides a model that queries through the registered connection", async function () {
      const model = testingModule.get<typeof User>(User);

      await model.query().insert({ name: "Ada" });

      await expect(model.query().select("name")).resolves.toEqual([
        expect.objectContaining({ name: "Ada" }),
      ]);
    });
  });
});
