# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.8.0](https://github.com/cpro-js/generator-ui5-react/compare/generator-ui5-react-v1.7.0...generator-ui5-react-v1.8.0) (2025-03-03)


### Features

* use verbatim module syntax ([c997d38](https://github.com/cpro-js/generator-ui5-react/commit/c997d3822ac59441d84356a3972575015cf1c48b))


### Bug Fixes

* bump ui5 web components - fixes HTML types ([addc3d4](https://github.com/cpro-js/generator-ui5-react/commit/addc3d4d651bdcbedb7c0cfae0f49c7a3abd7d09))
* enables the use of pure ESM packages ([3e76045](https://github.com/cpro-js/generator-ui5-react/commit/3e760451e4b1582516cb458a4a7f850ba5d0d310))
* env runtime types ([b6eb165](https://github.com/cpro-js/generator-ui5-react/commit/b6eb1654267f29d48f1bc66044362da7719cc062))
* load env variables correctly / allow reload of env vars ([6ff05c9](https://github.com/cpro-js/generator-ui5-react/commit/6ff05c95219ec88e2ec264a60bec64507d0683d4))
* use types for SAPUI5 version 1.120 ([13ef91a](https://github.com/cpro-js/generator-ui5-react/commit/13ef91ad0dcb0ad55aa708dc96635649339525fd))

## [1.7.0](https://github.com/cpro-js/generator-ui5-react/compare/generator-ui5-react-v1.6.0...generator-ui5-react-v1.7.0) (2025-01-14)


### Features

* add clsx as useful dependency ([9dd5fa9](https://github.com/cpro-js/generator-ui5-react/commit/9dd5fa9f5d30cfd4cdbea8df57f15aa9ca11a375))
* cross env compatible deployments ([400b258](https://github.com/cpro-js/generator-ui5-react/commit/400b258550e96ea27c3f96f39394ac78a949cab8))
* use env vars for deployment ([21648e7](https://github.com/cpro-js/generator-ui5-react/commit/21648e76d0dd93b151df2284e3b3bf49672aa9ac))
* use UI5's fullWidth within launchpad context ([d80da61](https://github.com/cpro-js/generator-ui5-react/commit/d80da61e5a5739a64b1d8e45047cb37e12100723))
* use variables for app.config.ts ([2ebc83c](https://github.com/cpro-js/generator-ui5-react/commit/2ebc83cb16a7c13a1da61556d60ae822d3aed415))


### Bug Fixes

* MainLayout is missing prop interface ([94239c0](https://github.com/cpro-js/generator-ui5-react/commit/94239c0ba28aa71b3d9ff3c609c78cce6d7c7c96))

## [1.6.0](https://github.com/cpro-js/generator-ui5-react/compare/generator-ui5-react-v1.5.0...generator-ui5-react-v1.6.0) (2025-01-13)


### Features

* only env vars which are used wihtin app get the APP_ prefix ([#14](https://github.com/cpro-js/generator-ui5-react/issues/14)) ([97e3355](https://github.com/cpro-js/generator-ui5-react/commit/97e3355c63875879f098a6ce30a4e275202ba62c))

## [1.5.0](https://github.com/cpro-js/generator-ui5-react/compare/generator-ui5-react-v1.4.0...generator-ui5-react-v1.5.0) (2025-01-10)


### Features

* improved handling of static vars & env vars ([2e80af3](https://github.com/cpro-js/generator-ui5-react/commit/2e80af31be9a4f88ce56d491fcc3560b2cd5a133))

## [1.4.0](https://github.com/cpro-js/generator-ui5-react/compare/generator-ui5-react-v1.3.0...generator-ui5-react-v1.4.0) (2025-01-08)


### Features

* add hook folder with some useful hooks ([2e981e3](https://github.com/cpro-js/generator-ui5-react/commit/2e981e34c54a40fb429f6a79e489fefbc2b740af))
* introduce dotenvx to retieve env vars for odata2ts.config.ts ([1322448](https://github.com/cpro-js/generator-ui5-react/commit/1322448eefd58c9f441c4c58c60d89ae4464e711))
* silence deprecation warnings for deps ins SASS ([4b74bde](https://github.com/cpro-js/generator-ui5-react/commit/4b74bde06780dca5d5e3400732125fd8321c63ad))
* switch to sap_horizon theme ([5989b48](https://github.com/cpro-js/generator-ui5-react/commit/5989b48f5a99877339a19cd4cf7f8885f1f617aa))
* update to web components 2.5 and adapt to that ([b3075fb](https://github.com/cpro-js/generator-ui5-react/commit/b3075fbbd266fec7a88cb304e3231a0d71eff0a1))
* use scss instead of jss ([37d59d4](https://github.com/cpro-js/generator-ui5-react/commit/37d59d448a687a1e50f64815612b897392e9a420))


### Bug Fixes

* add httpyac to static files ([df8364e](https://github.com/cpro-js/generator-ui5-react/commit/df8364e4f391052a7ce01d785b79c85663bad1aa))
* changed file paths & more mistakes ([4dffa41](https://github.com/cpro-js/generator-ui5-react/commit/4dffa412718e9ea65f24e6898252e7cc15594297))
* copy hook files ([50206e3](https://github.com/cpro-js/generator-ui5-react/commit/50206e3d104144d2957dce6897933783a0ce3a23))
* mockserver config ignores CustomFileLoader ([628ac36](https://github.com/cpro-js/generator-ui5-react/commit/628ac363a031a2560dcf01df4af6af5eefc22f0c))

## [1.3.0](https://github.com/cpro-js/generator-ui5-react/compare/generator-ui5-react-v1.2.0...generator-ui5-react-v1.3.0) (2024-12-14)


### Features

* add support for httpyac as means of using http scripts in VSCode ([6df83bf](https://github.com/cpro-js/generator-ui5-react/commit/6df83bf64b5d55df79046316bbc8e28f9c4eff15))


### Bug Fixes

* make prettier work with decorators by specifying importOrderParsers ([2f4d028](https://github.com/cpro-js/generator-ui5-react/commit/2f4d0284b0c0c926c4a6f5e640c10fb33f5f02e7))

## [1.2.0](https://github.com/cpro-js/generator-ui5-react/compare/generator-ui5-react-v1.1.0...generator-ui5-react-v1.2.0) (2024-04-25)


### Features

* support at least UI5 version 1.84.x ([c0da292](https://github.com/cpro-js/generator-ui5-react/commit/c0da292ff9399a7d37f72ba9fcdfeb6f7bad636a))


### Bug Fixes

* handling of startup parameters ([77736b0](https://github.com/cpro-js/generator-ui5-react/commit/77736b00bc7504814e6fb7ffd46d945df303b183))

## [1.1.0](https://github.com/cpro-js/generator-ui5-react/compare/generator-ui5-react-v1.0.0...generator-ui5-react-v1.1.0) (2024-04-22)


### Features

* add settings.json for VSCode with formatter info ([65df756](https://github.com/cpro-js/generator-ui5-react/commit/65df756e903b19aebfe74d7588775a50ec1d0a67))
* ask for userName & password & run generate ([d440326](https://github.com/cpro-js/generator-ui5-react/commit/d440326d142dba1e7595435aa63c84b181cee53e))
* dispense with TrippinService as example & download metadata via odata2ts ([#2](https://github.com/cpro-js/generator-ui5-react/issues/2)) ([e798552](https://github.com/cpro-js/generator-ui5-react/commit/e798552d48dc22ef52b5fc93d40f093d8eae5dd9))


### Bug Fixes

* add src-generated to TS include path ([fb67f8a](https://github.com/cpro-js/generator-ui5-react/commit/fb67f8a172443e43e404463e075470c6d4d26ad0))
* old react-ui5-notification ([fbd77dd](https://github.com/cpro-js/generator-ui5-react/commit/fbd77dd9e3fb5b5e46b7f7fa8a3e63d881c367b4))

## 1.0.0 (2024-04-18)


### Features

* fine-tuning ([09e6390](https://github.com/cpro-js/generator-ui5-react/commit/09e639083f205c777cb2ed61bcd25bd45d7c919b))
* new version of the generator featuring Vite and some restructuring ([7388e04](https://github.com/cpro-js/generator-ui5-react/commit/7388e04b5b461486c91c40fc68c40926f009984c))


### Build System

* release please config ([d42ea5d](https://github.com/cpro-js/generator-ui5-react/commit/d42ea5dbcf3e0034bc56fe8b6acbf3d8c75b46b7))

## [0.7.1](https://github.com/cpro-js/react-build-tools/compare/generator-ui5-react@0.7.0...generator-ui5-react@0.7.1) (2023-06-14)

### Bug Fixes

- **generator-ui5-react:** add missing files & add style example ([5b3f25c](https://github.com/cpro-js/react-build-tools/commit/5b3f25ce1c21fc4a14ee6d4b6b75d7dc6b2f8357))

# [0.7.0](https://github.com/cpro-js/react-build-tools/compare/generator-ui5-react@0.6.0...generator-ui5-react@0.7.0) (2023-06-14)

### Bug Fixes

- current UI5 LTS version, update README ([45ed8bd](https://github.com/cpro-js/react-build-tools/commit/45ed8bd69d9a13d0cce1b6b1b70ebd0ee376ceaf))
- **generator-ui5-react:** default proxy path ([4d8685c](https://github.com/cpro-js/react-build-tools/commit/4d8685c77e121957b68e8fbc116ecf54bce1cf54))

### Features

- **generator-ui5-react:** new TestPage with linking ([9d11e98](https://github.com/cpro-js/react-build-tools/commit/9d11e98dc6fbe9b58af21a0661929bb496d1a5b8))
- **generator-ui5-react:** run odata2ts generation automatically ([84e8acf](https://github.com/cpro-js/react-build-tools/commit/84e8acf63e4b064eb6579d2dea3bc973674db5ef))

# [0.6.0](https://github.com/cpro-js/react-build-tools/compare/generator-ui5-react@0.5.2...generator-ui5-react@0.6.0) (2023-04-11)

### Features

- **generator-ui5-react:** better http script template ([a3f5b4e](https://github.com/cpro-js/react-build-tools/commit/a3f5b4efbf13047a63f831ce9c01ac7b054ec295))
- **generator-ui5-react:** remove basePath ([64bded0](https://github.com/cpro-js/react-build-tools/commit/64bded0d6dec8858f1170a555d3c0e2e157108b5))

## [0.5.2](https://github.com/cpro-js/react-build-tools/compare/generator-ui5-react@0.5.1...generator-ui5-react@0.5.2) (2022-11-04)

**Note:** Version bump only for package generator-ui5-react

## [0.5.1](https://github.com/cpro-js/react-build-tools/compare/generator-ui5-react@0.5.0...generator-ui5-react@0.5.1) (2022-09-16)

**Note:** Version bump only for package generator-ui5-react

# [0.5.0](https://github.com/cpro-js/react-build-tools/compare/generator-ui5-react@0.4.1...generator-ui5-react@0.5.0) (2022-09-07)

### Features

- **generator-ui5-react:** exception handler suitable for V2 and V4 ([67fbd47](https://github.com/cpro-js/react-build-tools/commit/67fbd47cfe5a70a90bf7f4bf90fd846e477fea3d))
- **generator-ui5-react:** update deps ([83777fa](https://github.com/cpro-js/react-build-tools/commit/83777fac483caed8018e0fbeba030175bcba59e5))

## [0.4.1](https://github.com/cpro-js/react-build-tools/compare/generator-ui5-react@0.4.0...generator-ui5-react@0.4.1) (2022-08-25)

### Bug Fixes

- **generator-ui5-react:** minor fixes and adding http test script ([#20](https://github.com/cpro-js/react-build-tools/issues/20)) ([8c03951](https://github.com/cpro-js/react-build-tools/commit/8c039518c313170443f32640c606fb1f83312848))

# [0.4.0](https://github.com/cpro-js/react-build-tools/compare/generator-ui5-react@0.3.2...generator-ui5-react@0.4.0) (2022-08-25)

### Bug Fixes

- **ui5-react-generator:** missing stuff & update of deps ([#19](https://github.com/cpro-js/react-build-tools/issues/19)) ([9840dee](https://github.com/cpro-js/react-build-tools/commit/9840deef7a47b1533541fa3d108c60706fb4ce59))

### Features

- improved odata service integration ([#18](https://github.com/cpro-js/react-build-tools/issues/18)) ([ecc392d](https://github.com/cpro-js/react-build-tools/commit/ecc392d9da2fac07fe32489d737d9a2316f0c496))

## [0.3.2](https://github.com/cpro-js/react-build-tools/compare/generator-ui5-react@0.3.1...generator-ui5-react@0.3.2) (2022-06-13)

### Bug Fixes

- **generator-ui5-react:** always take the newest version of ui5-react-build ([8bf4548](https://github.com/cpro-js/react-build-tools/commit/8bf454841e8742d939167f63ede2cc23c09ddd80))

## [0.3.1](https://github.com/cpro-js/react-build-tools/compare/generator-ui5-react@0.3.0...generator-ui5-react@0.3.1) (2022-06-12)

### Bug Fixes

- **generator-ui5-react:** wrong import ([1331dce](https://github.com/cpro-js/react-build-tools/commit/1331dce09dca4d3c5f040b1bd79cdda6c4f24b31))
- **generator-ui5-react:** wrong template variable & misleading default value ([4964ddb](https://github.com/cpro-js/react-build-tools/commit/4964ddb26e2faae55b3a78bb54695a33771a0599))

# [0.3.0](https://github.com/cpro-js/react-build-tools/compare/generator-ui5-react@0.2.1...generator-ui5-react@0.3.0) (2022-06-09)

### Features

- proxy support ([#16](https://github.com/cpro-js/react-build-tools/issues/16)) ([501a676](https://github.com/cpro-js/react-build-tools/commit/501a6761ec615318026f5972d8b170e4dad0a4d9))

## [0.2.1](https://github.com/cpro-js/react-build-tools/compare/generator-ui5-react@0.2.0...generator-ui5-react@0.2.1) (2022-06-08)

### Bug Fixes

- **generator-ui5-react:** special treatment for gitignore ([0c1ae84](https://github.com/cpro-js/react-build-tools/commit/0c1ae8429c6b6d2ee2261b9c0a46dc8b16c18aad))

# 0.2.0 (2022-06-07)

### Features

- yeoman generator ([#15](https://github.com/cpro-js/react-build-tools/issues/15)) ([f478e7a](https://github.com/cpro-js/react-build-tools/commit/f478e7a8e0d0bd0abc048a204bc6f34dcff57a82))
