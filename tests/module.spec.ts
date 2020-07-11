import { Test, TestingModule } from "@nestjs/testing";
import knex from "knex";
import { Model } from "objection";
import { KNEX_CONNECTION } from "../lib/constants";
import { ObjectionModule } from "../lib/module";
import { User } from "./fixtures";

describe("ObjectionModule", () => {
  let testingModule: TestingModule;
  const config: knex.Config = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./testing.sqlite",
    },
  };

  describe("#register", () => {
    beforeAll(async () => {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionModule.register({
            config,
          }),
        ],
      }).compile();
    });

    afterAll(() => testingModule.close());

    test("provides a connection", () => {
      const connection = testingModule.get(KNEX_CONNECTION);

      expect(connection).toBeDefined();
    });

    test("provides a base model", () => {
      const model = testingModule.get(Model);

      expect(model).toBeDefined();
    });
  });

  describe("#registerAsync", () => {
    beforeAll(async () => {
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

    afterAll(() => testingModule.close());

    test("provides a connection", () => {
      const connection = testingModule.get("KnexConnection");

      expect(connection).toBeDefined();
    });

    test("provides a base model", () => {
      const model = testingModule.get("ObjectionBaseModel");

      expect(model).toBeDefined();
    });
  });

  describe("#forFeature", () => {
    beforeAll(async () => {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionModule.register({
            config,
          }),
          ObjectionModule.forFeature([User]),
        ],
      }).compile();
    });

    afterAll(() => testingModule.close());

    test("provides a model by token", () => {
      const model = testingModule.get(User);

      expect(model).toEqual(User);
    });

    test("provides a model by string name", () => {
      const model = testingModule.get("User");

      expect(model).toEqual(User);
    });
  });
});
