# NestJS Objection

[![pipeline status](https://gitlab.com/willsoto/nestjs-objection/badges/master/pipeline.svg)](https://gitlab.com/willsoto/nestjs-objection/commits/master)
[![coverage report](https://gitlab.com/willsoto/nestjs-objection/badges/master/coverage.svg)](https://gitlab.com/willsoto/nestjs-objection/commits/master)
[![Greenkeeper badge](https://badges.greenkeeper.io/willsoto/nestjs-objection.svg)](https://greenkeeper.io/)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Examples](#examples)
- [Configuration](#configuration)

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

## Examples

### `ObjectionModule.forRoot`

```typescript
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { Module } from "@nestjs/common";
import knex from "knex";
import { knexSnakeCaseMappers } from "objection";
import { ConfigModule, ConfigService } from "../config";
import { BaseModel } from "./base";

@Module({
  imports: [
    ObjectionModule.forRoot({
      // You can specify a custom BaseModel
      // If none is provided, the default Model will be used
      // https://vincit.github.io/objection.js/#models
      Model: BaseModel,
      config: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: {
          filename: "./example.sqlite"
        }
      }
    })
  ],
  exports: [ObjectionModule]
})
export class DatabaseModule {}
```

### `ObjectionModule.forRootAsync`

```typescript
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { Module } from "@nestjs/common";
import knex from "knex";
import { knexSnakeCaseMappers } from "objection";
import { ConfigModule, ConfigService } from "../config";
import { BaseModel } from "./base";

@Module({
  imports: [
    ObjectionModule.forRootAsync({
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
            ...knexSnakeCaseMappers()
          }
        };
      }
    })
  ],
  exports: [ObjectionModule]
})
export class DatabaseModule {}
```

## Configuration

| Name     | Type     | Required | Default             |
| -------- | -------- | -------- | ------------------- |
| `Model`  | `Object` | `false`  | `objection.Model`   |
| `config` | `Object` | `false`  | Knex default config |
