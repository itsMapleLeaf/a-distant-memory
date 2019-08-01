import { CommandBuilder, matchPrefixes } from "@enitoni/gears"
import { Client, Message } from "discord.js"
import { Storage } from "../storage/storage"
import { ReminderData } from "./reminder"
import { saveReminder } from "./save-reminder"

export function createReminderCommand(storage: Storage<ReminderData>) {
  return new CommandBuilder<Message, Client>()
    .match(matchPrefixes("remindme "))
    .use(async ({ message, content }) => {
      const result = saveReminder(content, message.author.id)

      const sendMessagePromise = message.channel.send(...result.message)

      const storagePromise =
        result.type === "success" ? storage.save(result.reminder) : undefined

      await sendMessagePromise
      await storagePromise
    })
    .done()
}
