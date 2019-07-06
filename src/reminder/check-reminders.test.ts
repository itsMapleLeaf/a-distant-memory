import { TestStorage } from "../storage/test-storage"
import { checkReminders } from "./check-reminders"
import { createReminder, ReminderData } from "./reminder"

function setup() {
  const sendFn = jest.fn()

  const mockUser = {
    id: "fdjkslfjsdklf",
    send: sendFn
  }

  const mockClient = {
    fetchUser: async () => mockUser
  }

  const storage = new TestStorage<ReminderData>()

  return { storage, mockUser, mockClient, sendFn }
}

describe("checkReminders", () => {
  it("sends and removes reminders that have met their time", async () => {
    const { storage, mockUser, mockClient, sendFn } = setup()

    await storage.save(createReminder("do the thing", mockUser.id, -1000))
    await storage.save(createReminder("do the thing", mockUser.id, -1000))
    await storage.save(createReminder("do the thing", mockUser.id, 30000))

    await checkReminders(mockClient as any, storage)

    expect(sendFn).toHaveBeenCalledTimes(2)
    expect(await storage.findAll()).toHaveLength(1)
  })

  it("does nothing if there are no reminders", async () => {
    const { storage, mockClient, sendFn } = setup()

    await checkReminders(mockClient as any, storage)

    expect(sendFn).not.toHaveBeenCalled()
  })
})
