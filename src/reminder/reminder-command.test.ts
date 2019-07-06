import { runCommand } from "../bot/command"
import { TestDiscordMessage } from "../bot/mocks"
import { flushPromises } from "../helpers/flush-promises"
import { TestStorage } from "../storage/test-storage"
import { ReminderData } from "./reminder"
import { createReminderCommand } from "./reminder-command"

describe("reminder command", () => {
  it("saves reminders with specific prefixes", async () => {
    const storage = new TestStorage<ReminderData>()
    const command = createReminderCommand(storage)
    const message = new TestDiscordMessage("!remindme 1 minute, do the thing")

    await runCommand(command, message as any)
    await flushPromises()

    expect(message.channel.messages).toHaveLength(1) // need to assert that these aren't error responses... somehow
    expect(await storage.findAll()).toHaveLength(1)
  })
})
