import { createReminder } from "./reminder"
import { TestReminderStorage } from "./reminder-storage"

describe("reminder storage", () => {
  it("saves items", async () => {
    const storage = new TestReminderStorage()
    const reminder = await storage.save(
      createReminder("a thing", "whatever", 1000)
    )
    const items = await storage.findAll()
    expect(items[0]).toEqual(reminder)
  })

  it("removes items", async () => {
    const storage = new TestReminderStorage()

    const reminder = await storage.save(
      createReminder("a thing", "whatever", 1000)
    )

    await storage.remove(reminder.id)

    expect(await storage.findAll()).toHaveLength(0)
  })

  it("can find items", async () => {
    const storage = new TestReminderStorage()
    const saved = await storage.save(
      createReminder("a thing", "whatever", 1000)
    )
    const [found] = await storage.findAll(r => r.senderId === "whatever")
    const [notFound] = await storage.findAll(
      r => r.senderId === "doesn't exist"
    )

    expect(saved).toEqual(found)
    expect(notFound).toBeUndefined()
  })
})
