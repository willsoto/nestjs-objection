import { Test, TestingModule } from "@nestjs/testing";
import { Knex } from "knex";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { KNEX_CONNECTION } from "../src";
import { ConnectionCheck, ConnectionModule } from "./fixtures";

describe("Integration", function () {
  let connectionCheck: ConnectionCheck;
  let connection: Knex;
  let testingModule: TestingModule;

  beforeAll(async function () {
    testingModule = await Test.createTestingModule({
      imports: [ConnectionModule],
    }).compile();

    connectionCheck = testingModule.get<ConnectionCheck>(ConnectionCheck);
    connection = testingModule.get<Knex>(KNEX_CONNECTION);
  });

  afterAll(function () {
    return testingModule.close();
  });

  it("database works", async function () {
    await expect(connection.raw("select 1")).resolves.toEqual([{ "1": 1 }]);
  });

  it("the service is correctly initialized", function () {
    expect(connectionCheck).toBeTruthy();
  });

  it.skip("the connection correctly initialized", function () {
    expect(connectionCheck.connection).toBeTruthy();
  });

  it.skip("#pingCheck", async function () {
    await expect(connectionCheck.pingCheck()).resolves.toEqual([{ "1": 1 }]);
  });
});
