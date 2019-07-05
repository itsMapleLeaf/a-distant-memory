import { ReminderStorageService } from "./storage"

describe("reminder storage", () => {
  it("saves items", async () => {
    const storage = new ReminderStorageService()

    const remindOn = Date.now() + 1000

    await storage.save("whatever", remindOn)

    const items = await storage.getAll()
    expect(items[0]).toEqual({
      id: expect.any(String),
      senderId: "whatever",
      createdAt: expect.any(Number),
      remindOn
    })
  })
})
