import { Client } from "discord.js"
import { ReminderData } from "../reminder/reminder"
import { handleReminderCommand } from "../reminder/reminder-command"
import { Storage } from "../storage/storage"

export function createBot(storage: Storage<ReminderData>) {
  const client = new Client()

  client.on("message", message => {
    if (message.content.match(/^!remind(me)?\s+/)) {
      handleReminderCommand(storage, message)
    }
  })

  client.on("error", error => {
    console.error(error) // TODO: use an actual log file
  })

  return client
}
