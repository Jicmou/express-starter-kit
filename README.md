[![Build Status](https://travis-ci.org/Jicmou/express-starter-kit.svg?branch=master)](https://travis-ci.org/Jicmou/express-starter-kit)

# Express Starter Kit

Starter kit for express-based project

## Installation

```bash
git clone https://github.com/Jicmou/express-starter-kit.git <YOUR_DIRECTORY>
cd <YOUR_DIRECTORY>
npm install
```

## Run

To run locally, just run:

```bash
npm start
```

the `start` npm script runs the following command:

```bash
node dist/src/index.js --config environment-template.json
```

the `--config` flag is used to pass a `json` file containing the config. you are free to pass the config you want, provided the content follows the same schema as the given template.

Just run:

```bash
node dist/src/index.js --config <YOUR_CONFIG_FILE>
```

WARNING: the config file is mandatory for the app to run. There is no default config.

## Test

### Unit tests

```bash
npm run test:unit
```

### E2E tests

```bash
npm run test:e2e
```

### Run All test suites

```bash
npm run test
```

### Test Driven Development

The `tdd` script will trigger the test suite on every change.

```bash
npm run tdd
```
