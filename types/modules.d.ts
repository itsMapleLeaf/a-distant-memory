declare module "timestring" {
  namespace timestring {
    type TimeUnit = "ms" | "s" | "m" | "h" | "d" | "w" | "mth" | "y"
  }

  function timestring(string: string, unit?: timestring.TimeUnit): number

  export = timestring
}
