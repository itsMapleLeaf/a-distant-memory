import { checkReminders } from "./check-reminders"
import { createReminder } from "./reminder"
import { TestReminderStorage } from "./test-reminder-storage"

function setup() {
  const sendFn = jest.fn()

  const mockUser = {
    id: "fdjkslfjsdklf",
    send: sendFn
  }

  const mockBot = {
    client: {
      fetchUser: async () => mockUser
    }
  }

  const storage = new TestReminderStorage()

  return { storage, mockUser, mockBot, sendFn }
}

describe("checkReminders", () => {
  it("sends and removes reminders that have met their time", async () => {
    const { storage, mockUser, mockBot, sendFn } = setup()

    await storage.save(createReminder("do the thing", mockUser.id, -1000))
    await storage.save(createReminder("do the thing", mockUser.id, -1000))
    await storage.save(createReminder("do the thing", mockUser.id, 30000))

    await checkReminders(mockBot as any, storage)

    expect(sendFn).toHaveBeenCalledTimes(2)
    expect(await storage.findAll()).toHaveLength(1)
  })

  it("does nothing if there are no reminders", async () => {
    const { storage, mockBot, sendFn } = setup()

    await checkReminders(mockBot as any, storage)

    expect(sendFn).not.toHaveBeenCalled()
  })
})
