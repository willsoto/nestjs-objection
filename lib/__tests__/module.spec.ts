import { Test, TestingModule } from "@nestjs/testing";
import knex from "knex";
import { Model } from "objection";
import { ObjectionModule } from "../module";

describe("ObjectionModule", () => {
  let testingModule: TestingModule;
  const config: knex.Config = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./testing.sqlite"
    }
  };

  describe("#forRoot", () => {
    beforeEach(async () => {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionModule.forRoot({
            config
          })
        ]
      }).compile();
    });

    test("provides a connection", () => {
      const connection = testingModule.get<knex>("KnexConnection");

      expect(connection).toBeDefined();
    });

    test("provides a base model", () => {
      const model = testingModule.get<Model>("ObjectionBaseModel");

      expect(model).toBeDefined();
    });
  });

  describe("#forRootAsync", () => {
    beforeEach(async () => {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionModule.forRootAsync({
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
      const connection = testingModule.get<knex>("KnexConnection");

      expect(connection).toBeDefined();
    });

    test("provides a base model", () => {
      const model = testingModule.get<Model>("ObjectionBaseModel");

      expect(model).toBeDefined();
    });
  });
});
