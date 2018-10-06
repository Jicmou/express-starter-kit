# Extreme Quotation

Little app to animate an extreme quotation workshop with a remote team

## Installation

```bash
git clone https://github.com/Jicmou/extreme-quotation.git <YOUR_DIRECTORY>
cd <YOUR_DIRECTORY>
npm install
```

## Run

To run locally, just run:

```
npm start
```

the `start` npm script runs the following command:

```
node dist/index.js --config environment-template.json
```

the `--config` flag is used to pass a `json` file containing the config. you are free to pass the config you want, provided the content follows the same schema as the given template.

Just run:

```
node dist/index.js --config <YOUR_CONFIG_FILE>
```

WARNING: the config file is mandatory for the app to run. There is no default config.
