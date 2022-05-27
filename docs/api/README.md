QIWI SDK / [Exports](modules.md)

# Tie Logger

> 👔 Fully typed minimal platform-agnostic logger

[![Test Status](https://github.com/AlexXanderGrib/tie-logger/actions/workflows/test.yml/badge.svg)](https://github.com/AlexXanderGrib/tie-logger)
[![Downloads](https://img.shields.io/npm/dt/tie-logger.svg)](https://npmjs.com/package/tie-logger)
[![last commit](https://img.shields.io/github/last-commit/AlexXanderGrib/tie-logger.svg)](https://github.com/AlexXanderGrib/tie-logger)
[![codecov](https://img.shields.io/codecov/c/github/AlexXanderGrib/tie-logger/main.svg)](https://codecov.io/gh/AlexXanderGrib/tie-logger)
[![GitHub](https://img.shields.io/github/stars/AlexXanderGrib/tie-logger.svg)](https://github.com/AlexXanderGrib/tie-logger)
[![tie-logger](https://snyk.io/advisor/npm-package/tie-logger/badge.svg)](https://snyk.io/advisor/npm-package/tie-logger)
[![Known Vulnerabilities](https://snyk.io/test/npm/tie-logger/badge.svg)](https://snyk.io/test/npm/tie-logger)
[![Quality](https://img.shields.io/npms-io/quality-score/tie-logger.svg?label=quality%20%28npms.io%29&)](https://npms.io/search?q=tie-logger)
[![npm](https://img.shields.io/npm/v/tie-logger.svg)](https://npmjs.com/package/tie-logger)
[![license MIT](https://img.shields.io/npm/l/tie-logger.svg)](https://github.com/AlexXanderGrib/tie-logger/blob/main/LICENSE.txt)
[![Size](https://img.shields.io/bundlephobia/minzip/tie-logger)](https://bundlephobia.com/package/tie-logger)

## 📦 Installation

- **Using `npm`**
  ```shell
  npm i tie-logger
  ```
- **Using `Yarn`**
  ```shell
  yarn add tie-logger
  ```
- **Using `pnpm`**
  ```shell
  pnpm add tie-logger
  ```

## Usage

### Initialization

```javascript
/** @file: logger.js */
import { Logger, logLevels, filter } from "tie-logger";

export const logger = new Logger(
  "app", // Root logger name
  logLevels(), // Define log levels. By default are: verbose, debug, info, warn, error, fatal
  // You can use custom levels by using
  // logLevels("info", "warn", "error")

  {
    // Custom data
    appVersion: "3.1"
    moduleName: "root",
    moduleVersion: "1.0.0"
  }
);

export const child = logger.child(
  // Child logger name
  "auth",

  // Child logger data
  { moduleName: "auth", moduleVersion: "0.3.1" }
);

const criticalLogs = [];

const unsubscribe = logger.subscribe(
  // Subscribe to all logs, they go to console
  (log) => console.log(...log.message.parts),

  // All logs, that level is greater or equal than "warn" will be added to critical logs

  // Severity is determined by index of level in levels array
  // Current array is: verbose, debug, info, warn, error, fatal
  //                             [less] <<<  ^^^^   >> [greater]
  filter(">=", "warn", (log) => criticalLogs.push(log))
)

process.on("SIGINT", () => {
  unsubscribe();
})
```

## Logging

```javascript
/** @file: index.js */
import { child, logger } from "./logger.js";

const PORT = parseInt(process.env.PORT) || 3000;
logger.subscribe(log => console.log(log));

child.log.debug`Application initialized. Port: ${{ port: PORT }}. Environment: ${{process.env}}`;
// Level:  ^^^^^

// Here goes app
```

## Log format

```javascript
({
  // One of defined levels
  level: "debug",

  message: {
    template:
      "Application initialized. Port: {port}. Environment: {SHELL,COLORTERM,PWD}",
    plain:
      'Application initialized. Port: 3000. Environment: {"SHELL":"/bin/bash","COLORTERM":"truecolor","PWD":"/home/alexxgrib/Projects/tie-logger"}',
    parts: [
      "Application initialized. Port:",
      { port: 3000 },
      ". Environment: ",
      {
        SHELL: "/bin/bash",
        COLORTERM: "truecolor",
        PWD: "/home/alexxgrib/Projects/tie-logger"
      }
    ]
  },

  // merge of
  // - logger data
  // - logger parents data
  // - data passed in log message
  data: {
    appVersion: "3.1",
    moduleName: "auth",
    moduleVersion: "0.3.1",
    port: 3000,
    SHELL: "/bin/bash",
    COLORTERM: "truecolor",
    PWD: "/home/alexxgrib/Projects/tie-logger"
  },

  context: {
    // name of the logger
    name: "auth",

    // list of logger inheritance
    path: ["app", "auth"]
  },

  // logger object
  origin: child
});
```
