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
  stringifyObject(value: unknown): string;
};

type ObjectWithName<N extends string = string> = {
  name?: N;
};

/**
 *
 *
 * @export
 * @template N
 * @param {unknown} object
 * @param {ObjectWithName<N>} [options={}]
 * @return {boolean}  {object is NamedValue<N>}
 */
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

/**
 *
 *
 * @param {unknown} object
 * @return {boolean}  {object is Record<string, unknown>}
 */
function isComplexObject(object: unknown): object is Record<string, unknown> {
  if (typeof object !== "object" || !object) return false;

  const keys = Object.keys(object);
  return keys.length > 1;
}

/**
 *
 * @param {LogContext<any>} context
 * @param {TemplateStringsArray} strings
 * @param {unknown[]} insertions
 * @return {object}
 */
function processLog(
  context: LogContext<any>,
  strings: TemplateStringsArray,
  insertions: unknown[]
) {
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

        const value = Object.getOwnPropertyDescriptor(insertion, name)?.value;
        Object.assign(data, { [name]: value });

        /* istanbul ignore next */
        plain +=
          typeof value === "object" ? context.stringifyObject(value) : String(value);
      } else if (isComplexObject(insertion)) {
        template += `{${Object.keys(insertion)}}`;
        Object.assign(data, insertion);
        plain += context.stringifyObject(insertion);
      } else {
        template += String(insertion);
        plain += String(insertion);
      }
    }
  }

  return { plain, template, data, parts: parts.filter((value) => value !== "") };
}

/**
 *
 *
 * @export
 * @template L
 * @param {LogContext<L>} context
 * @param {...L} levels
 * @return {LogWriter<L>}  {LogWriter<L>}
 */
export function createLogWriter<L extends LogLevels>(
  context: LogContext<L>,
  ...levels: L
): LogWriter<L> {
  const proto = {};
  const writer = {} as LogWriter<L>;

  /**
   *
   *
   * @param {string} level
   * @param {TemplateStringsArray} strings
   * @param {unknown[]} insertions
   */
  function write(
    level: L[number],
    strings: TemplateStringsArray,
    insertions: unknown[]
  ) {
    const { plain, template, data, parts } = processLog(
      context,
      strings,
      insertions
    );

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
