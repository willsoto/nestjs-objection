# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
