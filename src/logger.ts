import type { LogLevels } from "./levels";
import { createLogWriter, LogObject, LogWriter } from "./writer";

export type LogObjectWithContext<L extends LogLevels> = LogObject<L> & {
  context: {
    name: string;
    path: string[];
  };
  origin: Logger<L>;
};

type Subscription<T> = (value: T) => void;
type Unsubscribe = () => void;

export type LogSubscription<L extends LogLevels> = Subscription<
  LogObjectWithContext<L>
>;

type LoggerWithParent<
  Lv extends LogLevels,
  Pr extends Logger<Lv> = Logger<Lv>
> = Logger<Lv> & { readonly parent: Pr };

/**
 *
 *
 * @export
 * @class Logger
 * @template L
 */
export class Logger<L extends LogLevels> {
  public readonly log: LogWriter<L>;
  private readonly _subscriptions = new Set<LogSubscription<L>>();

  /**
   * Creates an instance of Logger.
   * @param {string} name
   * @param {L} levels
   * @param {Record<string, unknown>} [data={}]
   * @param {Logger<L>} [parent]
   * @memberof Logger
   */
  constructor(
    public readonly name: string,
    public readonly levels: L,
    public data: Record<string, unknown> = {},
    public readonly parent?: Logger<L>
  ) {
    this.log = createLogWriter({ log: this._pipe.bind(this) }, ...levels);
  }

  /**
   *
   *
   * @protected
   * @param {(LogObject<L> | LogObjectWithContext<L>)} log
   * @memberof Logger
   */
  protected _pipe(log: LogObject<L> | LogObjectWithContext<L>): void {
    const logWithContext: LogObjectWithContext<L> = {
      level: log.level,
      message: log.message,
      time: log.time,
      data: { ...this.data, ...log.data },
      context:
        "context" in log
          ? { name: log.context.name, path: [this.name, ...log.context.path] }
          : { name: this.name, path: [this.name] },
      origin: "origin" in log ? log.origin : this
    };

    if (this.parent) this.parent._pipe(logWithContext);

    for (const subscription of this._subscriptions) {
      subscription(logWithContext);
    }
  }

  /**
   *
   *
   * @param {string} name
   * @param {Record<string, unknown>} data
   * @return {LoggerWithParent<L, this>}  {LoggerWithParent<L, this>}
   * @memberof Logger
   */
  child(name: string, data: Record<string, unknown>): LoggerWithParent<L, this> {
    return new Logger(name, this.levels, data, this) as LoggerWithParent<L, this>;
  }

  /**
   *
   *
   * @param {...Subscription<LogObjectWithContext<L>>[]} subscriptions
   * @return {function(): void}  {Unsubscribe}
   * @memberof Logger
   */
  subscribe(...subscriptions: Subscription<LogObjectWithContext<L>>[]): Unsubscribe {
    for (const subscription of subscriptions) {
      this._subscriptions.add(subscription);
    }

    return () => {
      for (const subscription of this._subscriptions) {
        this._subscriptions.delete(subscription);
      }
    };
  }
}

/**
 *
 *
 * @export
 * @template L
 * @param {(">" | "<" | "=" | ">=" | "<=")} filter
 * @param {string} level
 * @param {LogSubscription<L>} subscription
 * @return {*}  {LogSubscription<L>}
 */
export function filter<L extends LogLevels>(
  filter: ">" | "<" | "=" | ">=" | "<=",
  level: L[number],
  subscription: LogSubscription<L>
): LogSubscription<L> {
  return (log) => {
    const logValue = log.origin.levels.indexOf(log.level);
    const targetValue = log.origin.levels.indexOf(level);

    const conditions: Record<typeof filter, boolean> = {
      "<": logValue < targetValue,
      "<=": logValue <= targetValue,
      "=": logValue === targetValue,
      ">": logValue > targetValue,
      ">=": logValue >= targetValue
    };

    const filterValue = Object.getOwnPropertyDescriptor(conditions, filter)?.value;
    if (filterValue) return subscription(log);
  };
}
