import { matchPrefixes } from "@enitoni/gears"
import { CommandBuilder } from "@enitoni/gears-discordjs"
import { ReminderStorage } from "./reminder-storage"
import { saveReminder } from "./save-reminder"

export function createReminderCommand(storage: ReminderStorage) {
  return new CommandBuilder()
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
