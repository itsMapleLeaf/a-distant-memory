import { sleep } from "./sleep"

describe("sleep", () => {
  it("resolves in the given number of milliseconds", async () => {
    const start = Date.now()
    await sleep(300)
    const end = Date.now()

    expect(end - start).toBeGreaterThanOrEqual(300)
  })
})
