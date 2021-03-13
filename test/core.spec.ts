import { Injectable } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { expect } from "chai";
import * as Knex from "knex";
import { Model } from "objection";
import * as sinon from "sinon";
import {
  KNEX_CONNECTION,
  OBJECTION_BASE_MODEL,
  OBJECTION_MODULE_OPTIONS,
} from "../src/constants";
import { ObjectionCoreModule } from "../src/core";
import {
  ObjectionModuleOptions,
  ObjectionModuleOptionsFactory,
} from "../src/interfaces";

describe("ObjectionCoreModule", function () {
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
          ObjectionCoreModule.register({
            config,
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
      const model = testingModule.get(Model);

      expect(model).to.eq(Model);
    });
  });

  describe("#registerAsync", function () {
    before(async function () {
      testingModule = await Test.createTestingModule({
        imports: [
          ObjectionCoreModule.registerAsync({
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
      const connection = testingModule.get<Knex>(KNEX_CONNECTION);

      expect(connection).to.be.ok;
    });

    it("provides a base model", function () {
      const model = testingModule.get<Model>(OBJECTION_BASE_MODEL);

      expect(model).to.eq(Model);
    });
  });

  describe("#createAsyncProviders", function () {
    class ModuleOptionsFactory implements ObjectionModuleOptionsFactory {
      public createObjectionModuleOptions(): ObjectionModuleOptions {
        return {
          config,
        };
      }
    }

    it("throws an error if options.useClass, useExisting, useFactory are not provided", function () {
      expect(() => {
        ObjectionCoreModule["createAsyncProviders"]({});
      }).to.throw("Invalid configuration");
    });

    it("leverages useClass if provided", function () {
      const providers = ObjectionCoreModule["createAsyncProviders"]({
        useClass: ModuleOptionsFactory,
      });

      expect(providers).to.be.an("array").with.lengthOf(2);

      expect(providers[0])
        .to.have.property("inject")
        .deep.equal([ModuleOptionsFactory]);
      expect(providers[0]).to.have.property(
        "provide",
        OBJECTION_MODULE_OPTIONS,
      );

      expect(providers[1]).to.have.property("useClass", ModuleOptionsFactory);
      expect(providers[1]).to.have.property("provide", ModuleOptionsFactory);
    });

    it("returns an array of providers when useExisting is passed", function () {
      const providers = ObjectionCoreModule["createAsyncProviders"]({
        useExisting: ModuleOptionsFactory,
      });

      expect(providers).to.be.an("array").with.lengthOf(1);

      expect(providers[0])
        .to.have.property("inject")
        .deep.equal([ModuleOptionsFactory]);
      expect(providers[0]).to.have.property(
        "provide",
        OBJECTION_MODULE_OPTIONS,
      );
    });

    it("returns an array of providers when useFactory is passed", function () {
      const providers = ObjectionCoreModule["createAsyncProviders"]({
        useFactory: () => ({
          config,
        }),
      });

      expect(providers).to.be.an("array").with.lengthOf(1);

      expect(providers[0]).to.have.property("inject").deep.equal([]);
      expect(providers[0]).to.have.property(
        "provide",
        OBJECTION_MODULE_OPTIONS,
      );
    });
  });

  describe("#createAsyncOptionsProvider", function () {
    // eslint-disable-next-line mocha/no-setup-in-describe
    @Injectable()
    class ModuleOptionsFactory implements ObjectionModuleOptionsFactory {
      public createObjectionModuleOptions(): ObjectionModuleOptions {
        return {
          config,
        };
      }
    }

    it("returns the appropriate provider when useFactory is passed", function () {
      const provider = ObjectionCoreModule["createAsyncOptionsProvider"]({
        useFactory: () => ({
          config,
        }),
      });

      expect(provider).to.have.property("inject").deep.equal([]);
      expect(provider).to.have.property("provide", OBJECTION_MODULE_OPTIONS);
    });

    it("returns the appropriate provider when useExisting is passed", function () {
      const provider = ObjectionCoreModule["createAsyncOptionsProvider"]({
        useExisting: ModuleOptionsFactory,
      });

      expect(provider)
        .to.have.property("inject")
        .deep.equal([ModuleOptionsFactory]);
      expect(provider).to.have.property("provide", OBJECTION_MODULE_OPTIONS);
    });

    it("returns an async factory function that calls createObjectionModuleOptions", async function () {
      sinon.spy(ModuleOptionsFactory.prototype, "createObjectionModuleOptions");

      await Test.createTestingModule({
        imports: [
          ObjectionCoreModule.registerAsync({
            useClass: ModuleOptionsFactory,
          }),
        ],
      }).compile();

      expect(ModuleOptionsFactory.prototype.createObjectionModuleOptions).to
        .have.been.called;
    });
  });
});
