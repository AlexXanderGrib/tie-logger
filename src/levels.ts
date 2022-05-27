export const defaultLevels = [
  "verbose",
  "debug",
  "info",
  "warn",
  "error",
  "fatal"
] as const;
export type defaultLevels = typeof defaultLevels;
export type LogLevels = readonly string[];

type LogLevelsDefaults<L extends LogLevels> = L extends readonly []
  ? defaultLevels
  : L;

export function logLevels<L extends LogLevels>(...levels: L): LogLevelsDefaults<L> {
  if (levels.length === 0) return defaultLevels as LogLevelsDefaults<L>;
  return levels as LogLevelsDefaults<L>;
}
