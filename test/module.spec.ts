import { Test, TestingModule } from "@nestjs/testing";
import { expect } from "chai";
import { Knex } from "knex";
import { Model } from "objection";
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
    before(async function () {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionModule.register({
            config,
          }),
        ],
      }).compile();
    });

    after(function () {
      return testingModule.close();
    });

    it("provides a connection", function () {
      const connection = testingModule.get<Knex>(KNEX_CONNECTION);

      expect(connection).to.be.ok;
    });

    it("provides a base model", function () {
      const model = testingModule.get(Model);

      expect(model).to.be.ok;
    });
  });

  describe("#registerAsync", function () {
    before(async function () {
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

    after(function () {
      return testingModule.close();
    });

    it("provides a connection", function () {
      const connection = testingModule.get<Knex>("KnexConnection");

      expect(connection).to.be.ok;
    });

    it("provides a base model", function () {
      const model = testingModule.get<Model>("ObjectionBaseModel");

      expect(model).to.eq(Model);
    });
  });

  describe("#forFeature", function () {
    before(async function () {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionModule.register({
            config,
          }),
          ObjectionModule.forFeature([User]),
        ],
      }).compile();
    });

    after(function () {
      return testingModule.close();
    });

    it("provides a model by token", function () {
      const model = testingModule.get(User);

      expect(model).to.eql(User);
    });

    it("provides a model by string name", function () {
      const model = testingModule.get<User>("User");

      expect(model).to.eql(User);
    });
  });
});
