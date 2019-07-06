import { TestDiscordChannel, TestDiscordMessage } from "../bot/mocks"
import { flushPromises } from "../helpers/flush-promises"
import { TestStorage } from "../storage/test-storage"
import { ReminderData } from "./reminder"
import { handleReminderCommand } from "./reminder-command"

describe("reminder command", () => {
  it("saves reminders with specific prefixes", async () => {
    const storage = new TestStorage<ReminderData>()

    const channel = new TestDiscordChannel()

    const messages = [
      "!remindme 1 minute, do the thing",
      "!remind 1 minute, do the thing"
    ].map(content => new TestDiscordMessage(content, channel))

    for (const message of messages) {
      await handleReminderCommand(storage, message as any)
    }

    await flushPromises()

    expect(channel.messages).toHaveLength(2) // need to assert that these aren't error responses... somehow
    expect(await storage.findAll()).toHaveLength(2)
  })
})
