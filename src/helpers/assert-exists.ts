export function assertExists<T>(
  value: T | undefined | null | void,
  failureMessage = "existence check failed",
) {
  if (value == null) {
    throw new Error(failureMessage)
  }
  return value
}
