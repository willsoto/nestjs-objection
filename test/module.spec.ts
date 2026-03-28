import { Test, TestingModule } from "@nestjs/testing";
import { Knex } from "knex";
import { Model } from "objection";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { KNEX_CONNECTION } from "../src/constants";
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

  describe("#forFeature", function () {
    beforeAll(async function () {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionModule.register({
            config,
          }),
          ObjectionModule.forFeature([User]),
        ],
      }).compile();
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
  });
});
