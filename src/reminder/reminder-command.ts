import { Message } from "discord.js"
import { Command } from "../bot/command"
import { Storage } from "../storage/storage"
import { ReminderData } from "./reminder"
import { saveReminder } from "./save-reminder"

export function createReminderCommand(storage: Storage<ReminderData>): Command {
  return {
    prefix: "remindme",
    handler: async (message: Message, content: string) => {
      const result = await saveReminder(content, message.author.id)
      message.channel.send(...result.message)

      if (result.type === "success") {
        storage.save(result.reminder)
      }
    },
  }
}
