# NestJS Objection

[![npm version](https://badge.fury.io/js/%40willsoto%2Fnestjs-objection.svg)](https://badge.fury.io/js/%40willsoto%2Fnestjs-objection)
[![NPM downloads](https://img.shields.io/npm/dt/@willsoto/nestjs-objection.svg)](https://www.npmjs.com/package/@willsoto/nestjs-objection)
![](https://github.com/willsoto/nestjs-objection/workflows/tests/badge.svg)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [API](#api)
- [Configuration](#configuration)
- [Examples](#examples)
  - [Injecting the Connection](#injecting-the-connection)

## Description

Integrates [Objection.js](https://vincit.github.io/objection.js/) and [Knex](https://knexjs.org/) with [Nest](https://nestjs.com/)

## Installation

```bash
yarn add @willsoto/nestjs-objection
```

_Note that Knex and Objection are `peerDependencies` to make version management easier, so those must be installed separately_

```bash
yarn add knex objection
```

## API

### `ObjectionModule.register`

```typescript
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { Module } from "@nestjs/common";
import knex from "knex";
import { knexSnakeCaseMappers } from "objection";
import { ConfigModule, ConfigService } from "../config";
import { BaseModel } from "./base";

@Module({
  imports: [
    ObjectionModule.register({
      // You can specify a custom BaseModel
      // If none is provided, the default Model will be used
      // https://vincit.github.io/objection.js/#models
      Model: BaseModel,
      config: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: {
          filename: "./example.sqlite",
        },
      },
    }),

    //Register your objection models so it can be provided when needed.
    ObjectionModule.forFeature([User]),
  ],
  exports: [ObjectionModule],
})
export class DatabaseModule {}
```

### `ObjectionModule.registerAsync`

```typescript
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { Module } from "@nestjs/common";
import knex from "knex";
import { knexSnakeCaseMappers } from "objection";
import { ConfigModule, ConfigService } from "../config";
import { BaseModel } from "./base";

@Module({
  imports: [
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          // You can specify a custom BaseModel
          // If none is provided, the default Model will be used
          // https://vincit.github.io/objection.js/#models
          Model: BaseModel,
          config: {
            ...config.get<knex.Config>("database"),
            ...knexSnakeCaseMappers(),
          },
        };
      },
    }),
    //Register your objection models so it can be provided when needed.
    ObjectionModule.forFeature([User]),
  ],
  exports: [ObjectionModule],
})
export class DatabaseModule {}
```

## Configuration

| Name     | Type     | Required | Default           |
| -------- | -------- | -------- | ----------------- |
| `Model`  | `Object` | `false`  | `objection.Model` |
| `config` | `Object` | `true`   |                   |

## Examples

### Injecting the connection

```ts
import { HealthCheckError } from "@godaddy/terminus";
import { Inject, Injectable } from "@nestjs/common";
import { HealthIndicatorResult, HealthIndicator } from "@nestjs/terminus";
import { Connection, KNEX_CONNECTION } from "@willsoto/nestjs-objection";

@Injectable()
export class PrimaryDatabaseHealthIndicator extends HealthIndicator {
  constructor(@Inject(KNEX_CONNECTION) public connection: Connection) {}

  async ping(key: string = "db-primary"): Promise<HealthIndicatorResult> {
    try {
      await this.connection.raw("SELECT 1");
      return super.getStatus(key, true);
    } catch (error) {
      const status = super.getStatus(key, false, { message: error.message });
      throw new HealthCheckError("Unable to connect to database", status);
    }
  }
}
```

### Injecting an objection model

```ts
import { Injectable, Inject } from "@nestjs/common";
import { User } from "./user.model";

@Injectable()
export class UserService {
  constructor(@Inject(User) private readonly userModel: typeof User) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.query();
  }
}
```
