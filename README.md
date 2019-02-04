# NestJS Objection

[![Greenkeeper badge](https://badges.greenkeeper.io/willsoto/nestjs-objection.svg)](https://greenkeeper.io/)

## Installation

```bash
yarn add @willsoto/nestjs-objection
```

_Note that Knex and Objection are `peerDependencies` to make version management easier, so those must be installed separately_

```bash
yarn add knex objection
```

## Getting Started

### forRoot

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
        ...config.get<knex.Config>("database"),
        ...knexSnakeCaseMappers()
      }
    })
  ],
  exports: [ObjectionModule]
})
export class DatabaseModule {}
```

### forRootAsync

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
