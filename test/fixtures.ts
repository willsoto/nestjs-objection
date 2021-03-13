import { Inject, Injectable, Module } from "@nestjs/common";
import * as Knex from "knex";
import { Model } from "objection";
import { Connection, KNEX_CONNECTION, ObjectionModule } from "../src";
@Injectable()
export class ConnectionCheck {
  constructor(@Inject(KNEX_CONNECTION) public connection: Connection) {}

  pingCheck(): Promise<Knex.Raw> {
    return this.connection.raw("SELECT 1");
  }
}

@Module({
  imports: [
    ObjectionModule.register({
      config: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: {
          filename: "./testing.sqlite",
        },
      },
    }),
  ],
  providers: [ConnectionCheck],
  exports: [ConnectionCheck],
})
export class ConnectionModule {}

export class User extends Model {
  static tableName = "users";
}
