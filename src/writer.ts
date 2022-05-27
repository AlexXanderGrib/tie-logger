import type { LogLevels } from "./levels";

export type LogWriter<L extends LogLevels> = {
  readonly [key in L[number]]: (
    strings: TemplateStringsArray,
    ...insertions: unknown[]
  ) => void;
};

export type NamedValue<N extends string> = {
  [key in N]: { toString(): string };
};

export type LogObject<L extends LogLevels> = {
  level: L[number];
  time: Date;
  message: {
    template: string;
    plain: string;
    parts: unknown[];
  };
  data: Record<string, any>;
};

export type LogContext<L extends LogLevels> = {
  log(value: LogObject<L>): void;
};

type ObjectWithName<N extends string = string> = {
  name?: N;
};

export function isNamedValue<N extends string = string>(
  object: unknown,
  /* istanbul ignore next */
  options: ObjectWithName<N> = {}
): object is NamedValue<N> {
  if (typeof object !== "object" || !object) return false;

  const keys = Object.keys(object);

  if (keys.length > 1) return false;

  /* istanbul ignore next */
  if (options.name) return keys[0] === options.name;

  options.name = keys[0] as N;
  return true;
}

function isComplexObject(object: unknown): object is Record<string, unknown> {
  if (typeof object !== "object" || !object) return false;

  const keys = Object.keys(object);
  return keys.length > 1;
}

function processLog(strings: TemplateStringsArray, insertions: unknown[]) {
  const data: Record<string, unknown> = {};
  let template = "";
  let plain = "";
  const parts = [];
  insertions = insertions.slice();

  for (const string of strings) {
    parts.push(string);
    plain += string;
    template += string;

    const insertion = insertions.shift();
    if (typeof insertion !== "undefined") {
      parts.push(insertion);
      const effect: ObjectWithName = {};

      if (isNamedValue(insertion, effect)) {
        const name = effect.name as string;
        template += `{${name}}`;
        const value = insertion[name];
        data[name] = value;
        /* istanbul ignore next */
        plain += typeof value === "object" ? JSON.stringify(value) : String(value);
      } else if (isComplexObject(insertion)) {
        template += `{${Object.keys(insertion)}}`;
        Object.assign(data, insertion);
        plain += JSON.stringify(insertion);
      } else {
        template += String(insertion);
        plain += String(insertion);
      }
    }
  }

  return { plain, template, data, parts: parts.filter((value) => value !== "") };
}

export function createLogWriter<L extends LogLevels>(
  context: LogContext<L>,
  ...levels: L
): LogWriter<L> {
  const proto = {};
  const writer = {} as LogWriter<L>;

  function write(
    level: L[number],
    strings: TemplateStringsArray,
    insertions: unknown[]
  ) {
    const { plain, template, data, parts } = processLog(strings, insertions);

    context.log({
      level,
      time: new Date(),
      message: { parts, plain, template },
      data
    });
  }

  for (const level of levels) {
    Object.defineProperty(proto, level, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: (string: TemplateStringsArray, ...insertions: unknown[]) =>
        write(level, string, insertions)
    });
  }

  Object.setPrototypeOf(writer, proto);
  return writer;
}
