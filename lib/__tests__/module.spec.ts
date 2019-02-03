import { Test, TestingModule } from "@nestjs/testing";
import knex from "knex";
import { Model } from "objection";
import { ObjectionCoreModule } from "../module";

describe("NestJS Objection module", () => {
  describe("forRoot", () => {
    let testingModule: TestingModule;

    beforeEach(async () => {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionCoreModule.forRoot({
            config: {
              client: "sqlite3",
              useNullAsDefault: true,
              connection: {
                filename: "./testing.sqlite"
              }
            }
          })
        ]
      }).compile();
    });

    test("provides a connection", () => {
      const connection = testingModule.get<knex>("KnexConnectionProvider");

      expect(connection).toBeDefined();
    });

    test("provides a base model", () => {
      const model = testingModule.get<Model>("ObjectionBaseModelProvider");

      expect(model).toBeDefined();
    });
  });
});
