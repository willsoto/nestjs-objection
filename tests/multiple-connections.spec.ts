import { Test, TestingModule } from "@nestjs/testing";
import Knex from "knex";
import { Model } from "objection";
import { ObjectionCoreModule } from "../lib/core";

describe("when registering multiple connections", () => {
  let testingModule: TestingModule;
  let connection1: Knex;
  let connection2: Knex;

  class Author extends Model {
    static tableName = "authors";
  }

  class Book extends Model {
    static tableName = "books";
  }

  describe("#register", () => {
    beforeAll(async () => {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionCoreModule.register({
            name: "connection1",
            Model: Author,
            config: {
              client: "sqlite3",
              useNullAsDefault: true,
              connection: {
                filename: "./testing.sqlite",
              },
            },
          }),
          ObjectionCoreModule.register({
            name: "connection2",
            Model: Book,
            config: {
              client: "sqlite3",
              useNullAsDefault: true,
              connection: {
                filename: "./testing2.sqlite",
              },
            },
          }),
        ],
      }).compile();

      connection1 = testingModule.get("connection1");
      connection2 = testingModule.get("connection2");

      if (!(await connection1.schema.hasTable(Author.tableName))) {
        await connection1.schema.createTable(Author.tableName, (t) => {
          t.increments().primary().notNullable();
          t.text("name").notNullable();
        });
      }

      if (!(await connection2.schema.hasTable(Book.tableName))) {
        await connection2.schema.createTable(Book.tableName, (t) => {
          t.increments().primary().notNullable();
          t.text("title").notNullable();
        });
      }
    });

    afterAll(() => testingModule.close());

    test("uses the given token for each connection", () => {
      expect(connection1).toBeDefined();
      expect(connection2).toBeDefined();
    });

    test("queries using the correct connection", async () => {
      expect(Author.knex()).toEqual(connection1);
      expect(Book.knex()).toEqual(connection2);

      await expect(Author.query()).resolves.toEqual([]);
      await expect(Book.query()).resolves.toEqual([]);
    });

    test("created tables", async () => {
      await expect(connection1.schema.hasTable(Book.tableName)).resolves.toBe(
        false,
      );
      await expect(connection2.schema.hasTable(Author.tableName)).resolves.toBe(
        false,
      );
    });
  });

  describe("#registerAsync", () => {
    beforeAll(async () => {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionCoreModule.registerAsync({
            name: "connection1",
            useFactory() {
              return {
                Model: Author,
                config: {
                  client: "sqlite3",
                  useNullAsDefault: true,
                  connection: {
                    filename: "./testing.sqlite",
                  },
                },
              };
            },
          }),
          ObjectionCoreModule.registerAsync({
            name: "connection2",
            useFactory() {
              return {
                Model: Book,
                config: {
                  client: "sqlite3",
                  useNullAsDefault: true,
                  connection: {
                    filename: "./testing2.sqlite",
                  },
                },
              };
            },
          }),
        ],
      }).compile();

      connection1 = testingModule.get("connection1");
      connection2 = testingModule.get("connection2");

      if (!(await connection1.schema.hasTable(Author.tableName))) {
        await connection1.schema.createTable(Author.tableName, (t) => {
          t.increments().primary().notNullable();
          t.text("name").notNullable();
        });
      }

      if (!(await connection2.schema.hasTable(Book.tableName))) {
        await connection2.schema.createTable(Book.tableName, (t) => {
          t.increments().primary().notNullable();
          t.text("title").notNullable();
        });
      }
    });

    afterAll(() => testingModule.close());

    test("uses the given token for each connection", () => {
      expect(connection1).toBeDefined();
      expect(connection2).toBeDefined();
    });

    test("queries using the correct connection", async () => {
      expect(Author.knex()).toEqual(connection1);
      expect(Book.knex()).toEqual(connection2);

      await expect(Author.query()).resolves.toEqual([]);
      await expect(Book.query()).resolves.toEqual([]);
    });

    test("created tables", async () => {
      await expect(connection1.schema.hasTable(Book.tableName)).resolves.toBe(
        false,
      );
      await expect(connection2.schema.hasTable(Author.tableName)).resolves.toBe(
        false,
      );
    });
  });
});
