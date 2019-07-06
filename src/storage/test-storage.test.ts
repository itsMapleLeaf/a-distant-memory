import { createReminder, ReminderData } from "../reminder/reminder"
import { TestStorage } from "./test-storage"

describe("test reminder storage", () => {
  it("saves items", async () => {
    const storage = new TestStorage()
    const reminder = await storage.save(
      createReminder("a thing", "whatever", 1000)
    )
    const items = await storage.findAll()
    expect(items[0]).toEqual(reminder)
  })

  it("removes items", async () => {
    const storage = new TestStorage()

    const reminder = await storage.save(
      createReminder("a thing", "whatever", 1000)
    )

    await storage.remove(reminder.id)

    expect(await storage.findAll()).toHaveLength(0)
  })

  it("can find items", async () => {
    const storage = new TestStorage<ReminderData>()
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
