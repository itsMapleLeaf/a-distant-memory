import { TestReminderStorage } from "./reminder-storage"

describe("reminder storage", () => {
  it("saves items", async () => {
    const storage = new TestReminderStorage()

    const remindOn = Date.now() + 1000

    await storage.save("a thing", "whatever", remindOn)

    const items = await storage.getAll()
    expect(items[0]).toEqual({
      id: expect.any(String),
      text: "a thing",
      senderId: "whatever",
      createdAt: expect.any(Number),
      remindOn
    })
  })

  it.todo("removes items")

  it.todo("can find items")
})
