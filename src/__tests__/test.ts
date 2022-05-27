import { Logger, logLevels, filter, LogSubscription } from "..";

describe("Logger", () => {
  const currentLevels = logLevels("log", "warn", "error");
  type levels = typeof currentLevels;
  const logger = new Logger("app", currentLevels);

  const child = logger.child("child", {
    child: true
  });

  test("Base", () => {
    const levels = ["log", "warn", "error"] as const;

    expect(child.parent).toBe(logger);
    expect(child.levels).toBe(logger.levels);
    expect(logger.levels).toStrictEqual(levels);

    for (const level of levels) {
      expect(logger.log[level]).toBeDefined();
      expect(child.log[level]).toBeDefined();
    }

    expect(logger.data).toStrictEqual({});
    expect(child.data).toStrictEqual({ child: true });
  });

  test("Base levels", () => {
    expect(logLevels()).toStrictEqual([
      "verbose",
      "debug",
      "info",
      "warn",
      "error",
      "fatal"
    ]);
  });

  test("Logging", () => {
    function match(levels: levels[number][]): LogSubscription<levels> {
      return (log) => expect(levels).toContain(log.level);
    }

    const unsubscribe = logger.subscribe(
      match(["log", "warn", "error"]),
      filter(">", "warn", match(["error"])),
      filter(">=", "warn", match(["error", "warn"])),
      filter("=", "warn", match(["warn"])),
      filter("<", "warn", match(["log"])),
      filter("<=", "warn", match(["log", "warn"])),
      filter("=", "error", (log) => {
        expect(log.context).toStrictEqual({
          name: child.name,
          path: [logger.name, child.name]
        });

        expect(log.data).toStrictEqual({ child: true });
        expect(log.message).toStrictEqual({
          template: "error 1",
          plain: "error 1",
          parts: ["error ", 1]
        });
      }),
      filter("=", "warn", (log) => {
        expect(log.data).toStrictEqual({ child: true, severity: 31, section: "/" });
        expect(log.message).toStrictEqual({
          template: "warn {severity,section}",
          plain: 'warn {"severity":31,"section":"/"}',
          parts: ["warn ", { severity: 31, section: "/" }]
        });
      }),
      filter("=", "log", (log) => {
        expect(log.data).toStrictEqual({ child: true, value: 5 });
        expect(log.message).toStrictEqual({
          template: "log {value}",
          plain: "log 5",
          parts: ["log ", { value: 5 }]
        });
      })
    );

    child.log.log`log ${{ value: 5 }}`;
    child.log.warn`warn ${{ severity: 31, section: "/" }}`;
    child.log.error`error ${1}`;

    unsubscribe();
  });
});
