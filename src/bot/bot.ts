import { Client, Message } from "discord.js"
import { ReminderData } from "../reminder/reminder"
import { handleReminderCommand } from "../reminder/reminder-command"
import { Storage } from "../storage/storage"

export function createBot(storage: Storage<ReminderData>) {
  const client = new Client()

  const commands = [
    {
      prefix: "remindme",
      handler: (message: Message, content: string) =>
        handleReminderCommand(storage, message, content)
    }
  ]

  const createPrefixRegex = (prefix: string) => new RegExp(`^!${prefix}\\s+`)

  client.on("message", message => {
    const command = commands.find(command => {
      const prefixRegex = createPrefixRegex(command.prefix)
      return prefixRegex.test(message.content)
    })

    if (command) {
      const prefixRegex = createPrefixRegex(command.prefix)
      const content = message.content.replace(prefixRegex, "")
      command.handler(message, content)
    }
  })

  client.on("error", error => {
    console.error(error) // TODO: use an actual log file
  })

  return client
}
