# [9.0.0](https://github.com/willsoto/nestjs-objection/compare/v8.1.2...v9.0.0) (2025-04-07)


### Features

* support Nest 11 ([1764ee5](https://github.com/willsoto/nestjs-objection/commit/1764ee58855b536b20c80bc1f0a6491ebae48533))


### BREAKING CHANGES

* Drop support for Nest v7

## [8.1.2](https://github.com/willsoto/nestjs-objection/compare/v8.1.1...v8.1.2) (2023-09-29)


### Bug Fixes

* **semantic-release:** deal with rate limiting ([fa84978](https://github.com/willsoto/nestjs-objection/commit/fa84978873d2852a59496373a69f274431f1d693))

## [8.1.1](https://github.com/willsoto/nestjs-objection/compare/v8.1.0...v8.1.1) (2023-09-29)


### Bug Fixes

* **readme:** update installation commands ([67e0138](https://github.com/willsoto/nestjs-objection/commit/67e0138152ef38e799066997e4263faa70df5c81)), closes [#1925](https://github.com/willsoto/nestjs-objection/issues/1925)

# [8.1.0](https://github.com/willsoto/nestjs-objection/compare/v8.0.0...v8.1.0) (2022-07-12)


### Features

* **nestjs:** support v9 ([77237bc](https://github.com/willsoto/nestjs-objection/commit/77237bca5953da54e2cc42f40b702f9f4f35cb22)), closes [#1549](https://github.com/willsoto/nestjs-objection/issues/1549)

# [8.0.0](https://github.com/willsoto/nestjs-objection/compare/v7.2.0...v8.0.0) (2022-04-25)


### Features

* upgrade to Knex 2.0 ([d22ce9d](https://github.com/willsoto/nestjs-objection/commit/d22ce9da98c27a31891d2b525b47fb578a6fcf65))


### BREAKING CHANGES

* See Knex changelog for details https://github.com/knex/knex/releases/tag/2.0.0

Signed-off-by: Will Soto <willsoto@users.noreply.github.com>

# [7.2.0](https://github.com/willsoto/nestjs-objection/compare/v7.1.0...v7.2.0) (2022-03-14)


### Features

* upgrade packages ([dc46cf8](https://github.com/willsoto/nestjs-objection/commit/dc46cf8763e998479585dbac3d68940dbf80ff5e))

# [7.1.0](https://github.com/willsoto/nestjs-objection/compare/v7.0.0...v7.1.0) (2022-02-28)


### Features

* upgrade packages ([13e35a0](https://github.com/willsoto/nestjs-objection/commit/13e35a073ab6ffe5c0063a9dd05ebb84851ffa7d))

# [7.0.0](https://github.com/willsoto/nestjs-objection/compare/v6.3.0...v7.0.0) (2022-01-17)


### Features

* **knex:** upgrade to Knex v1 ([7109016](https://github.com/willsoto/nestjs-objection/commit/7109016097c3fde35fd4be613c794192354bc4c8))


### BREAKING CHANGES

* **knex:** Knex is upgraded to v1

Signed-off-by: Will Soto <willsoto@users.noreply.github.com>

# [6.3.0](https://github.com/willsoto/nestjs-objection/compare/v6.2.0...v6.3.0) (2021-11-30)


### Features

* add node-tests reusable workflow ([96d4922](https://github.com/willsoto/nestjs-objection/commit/96d49224be8a43cc192a94271bafec75ee89a97b))

# [6.2.0](https://github.com/willsoto/nestjs-objection/compare/v6.1.0...v6.2.0) (2021-11-28)


### Features

* upgrade packages ([eacd0eb](https://github.com/willsoto/nestjs-objection/commit/eacd0eb97bdfca0642422541562171d14ba50304))

# [6.1.0](https://github.com/willsoto/nestjs-objection/compare/v6.0.0...v6.1.0) (2021-11-15)


### Features

* **releases:** generate and commit changelog ([e062b87](https://github.com/willsoto/nestjs-objection/commit/e062b87888e4a57a821954ef1ca9a59dc5dfe773))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [5.1.0](https://github.com/willsoto/nestjs-objection/compare/v5.0.0...v5.1.0) (2021-07-19)


### ⚠ BREAKING CHANGES

* **knex:** Knex typings have changed a lot, so probably breaking for people
until they upgrade

Signed-off-by: Will Soto <willsoto@users.noreply.github.com>

### Features

* upgrade to Nest 8.x ([0f8594c](https://github.com/willsoto/nestjs-objection/commit/0f8594c24c83adfc1dbbea4372f3ce91abb67843)), closes [#1140](https://github.com/willsoto/nestjs-objection/issues/1140)


### Bug Fixes

* **automerge:** make retry sleep 60 seconds ([af328fa](https://github.com/willsoto/nestjs-objection/commit/af328fad35bbecfcc55d94491037da5ce8484367))


* **knex:** upgrade to v0.95.x of Knex ([c8dc357](https://github.com/willsoto/nestjs-objection/commit/c8dc357f349ce5e7cca19befee997b3adf2e99a3))

## [5.0.0](https://github.com/willsoto/nestjs-objection/compare/v4.0.2...v5.0.0) (2021-03-05)


### ⚠ BREAKING CHANGES

* esModuleInertop is no longer used. Depending on how this module
is imported, it could be a breaking change

Signed-off-by: Will Soto <willsoto@users.noreply.github.com>

### Features

* don't use esModuleInterop ([728df76](https://github.com/willsoto/nestjs-objection/commit/728df7629535741af0cb880dadb02049f23c5850))

### [4.0.2](https://github.com/willsoto/nestjs-objection/compare/v4.0.1...v4.0.2) (2020-08-27)


### Bug Fixes

* **knex:** set knex dependency range to >= since it is not stable yet ([46d991c](https://github.com/willsoto/nestjs-objection/commit/46d991c34a9714bfe9bdaa5d05c9237f7bda4d91))

### [4.0.1](https://github.com/willsoto/nestjs-objection/compare/v4.0.0...v4.0.1) (2020-08-27)


### Bug Fixes

* **core:** switch to using onApplicationShutdown hook ([bdf4ea1](https://github.com/willsoto/nestjs-objection/commit/bdf4ea1bf770db8c9213cef837d0af7e99718bdd)), closes [/github.com/nestjs/typeorm/blob/9b67355a1f2d6d2bb44c240239d637e79c89b7f5/lib/typeorm-core.module.ts#L35](https://github.com/willsoto//github.com/nestjs/typeorm/blob/9b67355a1f2d6d2bb44c240239d637e79c89b7f5/lib/typeorm-core.module.ts/issues/L35)

## [4.0.0](https://github.com/willsoto/nestjs-objection/compare/v3.2.0...v4.0.0) (2020-08-27)


### ⚠ BREAKING CHANGES

* remove support for Nest v6 and Node <12

* remove support for Nest v6 and Node <12 ([d7506e8](https://github.com/willsoto/nestjs-objection/commit/d7506e8aec84bd57c65b2ce3c0153d8c413e8b0f))

## [3.2.0](https://github.com/willsoto/nestjs-objection/compare/v3.0.0...v3.2.0) (2020-07-28)


### Features

* **core:** add onApplicationShutdown hook ([668bc8e](https://github.com/willsoto/nestjs-objection/commit/668bc8e59457994808898213814ff5749f968ac9))
* **core:** switch to BeforeApplicationShutdown hook ([214e620](https://github.com/willsoto/nestjs-objection/commit/214e6202fa6c857c0fd8c83334c1b3275caf5f39))

## [3.1.0](https://github.com/willsoto/nestjs-objection/compare/v3.0.0...v3.1.0) (2020-07-11)


### Features

* **core:** add onApplicationShutdown hook ([668bc8e](https://github.com/willsoto/nestjs-objection/commit/668bc8e59457994808898213814ff5749f968ac9))

## [3.0.0](https://github.com/willsoto/nestjs-objection/compare/v2.2.0...v3.0.0) (2020-07-10)


### ⚠ BREAKING CHANGES

* **module:** forRoot and forRootAsync methods no longer exist.
Please start using register and registerAsync instead.

### Features

* support multiple connections ([b95c77f](https://github.com/willsoto/nestjs-objection/commit/b95c77f3c664adccf808557f7e90d73b0abbced6)), closes [#684](https://github.com/willsoto/nestjs-objection/issues/684)


* **module:** remove deprecated forRoot and forRootAsync methods ([6bba6e1](https://github.com/willsoto/nestjs-objection/commit/6bba6e1f5e6592014dced985ae1050c697e80d42))

## [2.2.0](https://github.com/willsoto/nestjs-objection/compare/v2.1.0...v2.2.0) (2020-05-23)


### Features

* **lib:** register and inject objection models ([#637](https://github.com/willsoto/nestjs-objection/issues/637)) ([da8822f](https://github.com/willsoto/nestjs-objection/commit/da8822fb7fbb115d7f47b26fd89e26dd1dafa1ed))

## [2.1.0](https://github.com/willsoto/nestjs-objection/compare/v2.0.0...v2.1.0) (2020-02-15)


### Features

* deprecate forRoot and forRootAsync ([5b2db23](https://github.com/willsoto/nestjs-objection/commit/5b2db234efe9b456101cd8553a3eb88c75f09716))
* **dependabot:** add dependabot config ([ca6225a](https://github.com/willsoto/nestjs-objection/commit/ca6225a2972d31f99ba582382f9e05ece160f906))
* **package:** add prettier-package-json ([b1c8e93](https://github.com/willsoto/nestjs-objection/commit/b1c8e93a57f06af0b2cf42a9579b29ca5ad078c4))
* **package:** upgrade all packages ([97eb451](https://github.com/willsoto/nestjs-objection/commit/97eb451f1307f7fb6e92834028b50250af7d6db9))
* **package:** upgrade rollup and babel ([ae2b433](https://github.com/willsoto/nestjs-objection/commit/ae2b433dd693cabd61e43840803ae057b1092a9f))


### Bug Fixes

* **core:** better condition for useClass and useExisting ([da5dc49](https://github.com/willsoto/nestjs-objection/commit/da5dc49d24bf564e1fd759c51dda9704cac9e8f2))

## [2.0.0](https://github.com/willsoto/nestjs-objection/compare/v1.1.0...v2.0.0) (2019-06-07)


### Bug Fixes

* **ci:** install python, make and g++ for all images ([c96fab2](https://github.com/willsoto/nestjs-objection/commit/c96fab2))
* **core:** guard against missing options ([d04a68f](https://github.com/willsoto/nestjs-objection/commit/d04a68f))
* **core:** mark Module as Global ([6042ce9](https://github.com/willsoto/nestjs-objection/commit/6042ce9)), closes [#106](https://github.com/willsoto/nestjs-objection/issues/106)


### Features

* **ci:** add node:12 to build matrix ([51ce4f0](https://github.com/willsoto/nestjs-objection/commit/51ce4f0))
* **dockerfile:** add node 12 dockerfile ([57fd8cc](https://github.com/willsoto/nestjs-objection/commit/57fd8cc))
* **package:** add volta ([e49405a](https://github.com/willsoto/nestjs-objection/commit/e49405a))
* **package:** update @nestjs/* to v6.3.1 ([2581b45](https://github.com/willsoto/nestjs-objection/commit/2581b45))
* **package:** update dependencies ([2271091](https://github.com/willsoto/nestjs-objection/commit/2271091)), closes [#88](https://github.com/willsoto/nestjs-objection/issues/88) [#89](https://github.com/willsoto/nestjs-objection/issues/89)
* **package:** update dependencies ([c19ea4b](https://github.com/willsoto/nestjs-objection/commit/c19ea4b)), closes [#86](https://github.com/willsoto/nestjs-objection/issues/86) [#87](https://github.com/willsoto/nestjs-objection/issues/87)
* **package:** upgrade all dependencies ([96c38c7](https://github.com/willsoto/nestjs-objection/commit/96c38c7)), closes [#81](https://github.com/willsoto/nestjs-objection/issues/81) [#82](https://github.com/willsoto/nestjs-objection/issues/82) [#83](https://github.com/willsoto/nestjs-objection/issues/83) [#84](https://github.com/willsoto/nestjs-objection/issues/84) [#85](https://github.com/willsoto/nestjs-objection/issues/85)
* **readme:** Add modifyable key to health indicator ([7e1a082](https://github.com/willsoto/nestjs-objection/commit/7e1a082))


### refactor

* **rollup:** remove CJS from outputs ([aa3454e](https://github.com/willsoto/nestjs-objection/commit/aa3454e))


### BREAKING CHANGES

* **rollup:** no longer builds a CJS module, use UMD instead

Signed-off-by: Will Soto <willsoto@users.noreply.github.com>



<a name="1.1.0"></a>
# [1.1.0](https://github.com/willsoto/nestjs-objection/compare/v1.0.4...v1.1.0) (2019-03-16)


### Features

* upgrade [@nestjs](https://github.com/nestjs)/* to v6 ([3fadbfa](https://github.com/willsoto/nestjs-objection/commit/3fadbfa)), closes [#48](https://github.com/willsoto/nestjs-objection/issues/48) [#49](https://github.com/willsoto/nestjs-objection/issues/49) [#50](https://github.com/willsoto/nestjs-objection/issues/50)



<a name="1.0.4"></a>
## [1.0.4](https://github.com/willsoto/nestjs-objection/compare/v1.0.3...v1.0.4) (2019-02-24)


### Bug Fixes

* re-enable allowSyntheticDefaultImports for tests ([ffe4bce](https://github.com/willsoto/nestjs-objection/commit/ffe4bce))



<a name="1.0.3"></a>
## [1.0.3](https://github.com/willsoto/nestjs-objection/compare/v1.0.1...v1.0.3) (2019-02-24)


### Bug Fixes

* **interfaces:** allow synthetic default imports ([c1074a4](https://github.com/willsoto/nestjs-objection/commit/c1074a4)), closes [#14](https://github.com/willsoto/nestjs-objection/issues/14)
* **rollup:** remove allowSyntheticDefaultImports ([e860356](https://github.com/willsoto/nestjs-objection/commit/e860356)), closes [#14](https://github.com/willsoto/nestjs-objection/issues/14)



<a name="1.0.2"></a>

## [1.0.2](https://github.com/willsoto/nestjs-objection/compare/v1.0.1...v1.0.2) (2019-02-14)

### Bug Fixes

- **interfaces:** allow synthetic default imports ([a31468e](https://github.com/willsoto/nestjs-objection/commit/a31468e)), closes [#14](https://github.com/willsoto/nestjs-objection/issues/14)

<a name="1.0.1"></a>

## [1.0.1](https://github.com/willsoto/nestjs-objection/compare/v1.0.0...v1.0.1) (2019-02-10)

### Bug Fixes

- **package:** point main and module at the correct files ([5dbfabb](https://github.com/willsoto/nestjs-objection/commit/5dbfabb))

<a name="1.0.0"></a>

# [1.0.0](https://github.com/willsoto/nestjs-objection/compare/v0.3.1...v1.0.0) (2019-02-07)

### Bug Fixes

- **package:** remove duplicate typings script ([2388553](https://github.com/willsoto/nestjs-objection/commit/2388553))

### Code Refactoring

- make knex.config required ([0a40d73](https://github.com/willsoto/nestjs-objection/commit/0a40d73))

### Features

- **ci:** switch to GitLab CI ([545f2ac](https://github.com/willsoto/nestjs-objection/commit/545f2ac))

### BREAKING CHANGES

- config is now required

Signed-off-by: Will Soto <willsoto@users.noreply.github.com>

<a name="0.3.2"></a>

## [0.3.2](https://github.com/willsoto/nestjs-objection/compare/v0.3.1...v0.3.2) (2019-02-06)

<a name="0.3.1"></a>

## [0.3.1](https://github.com/willsoto/nestjs-objection/compare/v0.3.0...v0.3.1) (2019-02-04)

<a name="0.3.0"></a>

# [0.3.0](https://github.com/willsoto/nestjs-objection/compare/v0.2.1...v0.3.0) (2019-02-04)

### Bug Fixes

- **rollup:** add [@nestjs](https://github.com/nestjs)/common to globals ([36a4003](https://github.com/willsoto/nestjs-objection/commit/36a4003))
- **workflow:** actions cannot point at workflows ([a1f1f51](https://github.com/willsoto/nestjs-objection/commit/a1f1f51))

### Features

- **workflow:** add action for Publishing new releases ([0ec837f](https://github.com/willsoto/nestjs-objection/commit/0ec837f))
- **workflow:** add PR workflow for CI ([99e3489](https://github.com/willsoto/nestjs-objection/commit/99e3489))

<a name="0.2.1"></a>

## 0.2.1 (2019-02-04)

### Features

- add commitlint ([5003674](https://github.com/willsoto/nestjs-objection/commit/5003674))
- add standard-release for cutting releases ([00c51a1](https://github.com/willsoto/nestjs-objection/commit/00c51a1))
- **all:** initial commit ([a7ec179](https://github.com/willsoto/nestjs-objection/commit/a7ec179))
- **package:** add husky ([ed44af0](https://github.com/willsoto/nestjs-objection/commit/ed44af0))
- **workflow:** add main.workflow ([9fbaa37](https://github.com/willsoto/nestjs-objection/commit/9fbaa37))
