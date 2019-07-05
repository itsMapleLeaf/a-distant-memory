import { TestReminderStorage } from "./reminder-storage"

describe("reminder storage", () => {
  it("saves items", async () => {
    const storage = new TestReminderStorage()
    const reminder = await storage.save(
      "a thing",
      "whatever",
      Date.now() + 1000
    )
    const items = await storage.getAll()
    expect(items[0]).toEqual(reminder)
  })

  it("removes items", async () => {
    const storage = new TestReminderStorage()

    const reminder = await storage.save(
      "a thing",
      "whatever",
      Date.now() + 1000
    )

    await storage.remove(reminder.id)

    expect(await storage.getAll()).toHaveLength(0)
  })

  it("can find items", async () => {
    const storage = new TestReminderStorage()
    const saved = await storage.save("a thing", "whatever", Date.now() + 1000)
    const found = await storage.find(r => r.senderId === "whatever")
    const notFound = await storage.find(r => r.senderId === "doesn't exist")

    expect(saved).toEqual(found)
    expect(notFound).toBeUndefined()
  })
})
