import { Test, TestingModule } from "@nestjs/testing";
import { expect } from "chai";
import { Knex } from "knex";
import { KNEX_CONNECTION } from "../src";
import { ConnectionCheck, ConnectionModule } from "./fixtures";
describe("Integration", function () {
  let connectionCheck: ConnectionCheck;
  let connection: Knex;
  let testingModule: TestingModule;

  before(async function () {
    testingModule = await Test.createTestingModule({
      imports: [ConnectionModule],
    }).compile();

    connectionCheck = testingModule.get<ConnectionCheck>(ConnectionCheck);
    connection = testingModule.get<Knex>(KNEX_CONNECTION);
  });

  after(function () {
    return testingModule.close();
  });

  it("database works", function () {
    return expect(connection.raw("select 1")).to.eventually.eql([{ "1": 1 }]);
  });

  it("the service is correctly initialized", function () {
    expect(connectionCheck).to.be.ok;
  });

  it.skip("the connection correctly initialized", function () {
    expect(connectionCheck.connection).to.be.ok;
  });

  it.skip("#pingCheck", function () {
    return expect(connectionCheck.pingCheck()).to.eventually.eql([{ "1": 1 }]);
  });
});
