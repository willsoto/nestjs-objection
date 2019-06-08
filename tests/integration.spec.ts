/* eslint-disable new-cap */
import { Test, TestingModule } from "@nestjs/testing";
import Knex from "knex";
import { KNEX_CONNECTION } from "../lib";
import { ConnectionCheck, ConnectionModule } from "./fixtures";

describe("Integration", () => {
  let connectionCheck: ConnectionCheck;
  let connection: Knex;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [ConnectionModule]
    }).compile();

    connectionCheck = testingModule.get<ConnectionCheck>(ConnectionCheck);
    connection = testingModule.get<Knex>(KNEX_CONNECTION);
  });

  test("database works", () => {
    return expect(connection.raw("select 1")).resolves.toEqual([{ "1": 1 }]);
  });

  test("the service is correctly initialized", () => {
    expect(connectionCheck).toBeDefined();
  });

  test.skip("the connection correctly initialized", () => {
    expect(connectionCheck.connection).toBeDefined();
  });

  test.skip("#pingCheck", () => {
    return expect(connectionCheck.pingCheck()).resolves.toEqual([{ "1": 1 }]);
  });
});
