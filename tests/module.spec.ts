import { KNEX_CONNECTION, OBJECTION_BASE_MODEL } from "@/constants";
import { ObjectionModule } from "@/module";
import { Test, TestingModule } from "@nestjs/testing";
import knex from "knex";

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
    beforeEach(async () => {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionModule.register({
            config,
          }),
        ],
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

  describe("#registerAsync", () => {
    beforeEach(async () => {
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

    test("provides a connection", () => {
      const connection = testingModule.get("KnexConnection");

      expect(connection).toBeDefined();
    });

    test("provides a base model", () => {
      const model = testingModule.get("ObjectionBaseModel");

      expect(model).toBeDefined();
    });
  });
});
