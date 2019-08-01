import { assertExists } from "./assert-exists"

describe("assertExists", () => {
  it("throws if the value is nil", () => {
    expect(() => assertExists(null)).toThrow()
    expect(() => assertExists(undefined)).toThrow()
  })

  it("throws with a custom message", () => {
    const message = "custom message"
    expect(() => assertExists(null, message)).toThrow(message)
    expect(() => assertExists(undefined, message)).toThrow(message)
  })

  it("returns the value if it is not nil", () => {
    expect(assertExists("")).toBe("")
    expect(assertExists(0)).toBe(0)
    expect(assertExists([])).toEqual([])
    expect(assertExists({})).toEqual({})
    expect(assertExists("something else")).toBe("something else")
  })
})
