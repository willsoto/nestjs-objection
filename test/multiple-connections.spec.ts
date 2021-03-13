import { Test, TestingModule } from "@nestjs/testing";
import { expect } from "chai";
import { Knex } from "knex";
import { Model } from "objection";
import { ObjectionCoreModule } from "../src/core";

describe("when registering multiple connections", function () {
  let testingModule: TestingModule;
  let connection1: Knex;
  let connection2: Knex;

  class Author extends Model {
    static tableName = "authors";
  }

  class Book extends Model {
    static tableName = "books";
  }

  describe("#register", function () {
    before(async function () {
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

    after(function () {
      return testingModule.close();
    });

    it("uses the given token for each connection", function () {
      expect(connection1).to.be.ok;
      expect(connection2).to.be.ok;
    });

    it("queries using the correct connection", async function () {
      expect(Author.knex()).to.eql(connection1);
      expect(Book.knex()).to.eql(connection2);

      await expect(Author.query()).to.eventually.eql([]);
      await expect(Book.query()).to.eventually.eql([]);
    });

    it("created tables", async function () {
      await expect(
        connection1.schema.hasTable(Book.tableName),
      ).to.eventually.eql(false);
      await expect(
        connection2.schema.hasTable(Author.tableName),
      ).to.eventually.eql(false);
    });
  });

  describe("#registerAsync", function () {
    before(async function () {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionCoreModule.registerAsync({
            name: "connection1",
            useFactory() {
              return {
                name: "connection1",
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
                name: "connection2",
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

    after(function () {
      return testingModule.close();
    });

    it("uses the given token for each connection", function () {
      expect(connection1).to.be.ok;
      expect(connection2).to.be.ok;
    });

    it("queries using the correct connection", async function () {
      expect(Author.knex()).to.eql(connection1);
      expect(Book.knex()).to.eql(connection2);

      await expect(Author.query()).to.eventually.eql([]);
      await expect(Book.query()).to.eventually.eql([]);
    });

    it("created tables", async function () {
      await expect(
        connection1.schema.hasTable(Book.tableName),
      ).to.eventually.eql(false);
      await expect(
        connection2.schema.hasTable(Author.tableName),
      ).to.eventually.eql(false);
    });
  });
});
