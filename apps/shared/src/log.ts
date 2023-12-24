const logVariant = [
  "success",
  "info",
  "warn",
  "error",
  "debug",
  "trace",
  "fatal",

  "light",
  "debugger",
  "reset",
] as const;

type VariantColor = {
  [key in (typeof logVariant)[number]]: string;
};

const variantColors: VariantColor = {
  success: "\x1b[32m%s\x1b[0m", //green
  info: "\x1b[36m%s\x1b[0m", //cyan
  warn: "\x1b[33m%s\x1b[0m", //yellow
  error: "\x1b[31m%s\x1b[0m", //red
  debug: "\x1b[35m%s\x1b[0m", //magenta
  trace: "\x1b[32m%s\x1b[0m", //green
  fatal: "\x1b[41m%s\x1b[0m", //red background

  light: "\x1b[37m%s\x1b[0m", //white
  debugger: "\x1b[34m%s\x1b[0m", //blue
  reset: "\x1b[0m%s\x1b[0m", //reset
} as const;

const log = (message: string, variant?: (typeof logVariant)[number]) => {
  const color = variantColors[variant ?? "info"];
  console.log(color, message);
};

export default log;
