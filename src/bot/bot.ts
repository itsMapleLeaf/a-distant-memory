import { Bot, ClientAdapter, matchPrefixes } from "@enitoni/gears"
import { CommandGroup } from "@enitoni/gears-discordjs"
import { Client, Message } from "discord.js"
import { ReminderData } from "../reminder/reminder"
import { createReminderCommand } from "../reminder/reminder-command"
import { Storage } from "../storage/storage"

export type DiscordBot = Bot<Message, Client>

export type DiscordClientAdapter = ClientAdapter<Client, Message>

export function createBot(
  adapter: DiscordClientAdapter,
  storage: Storage<ReminderData>
) {
  const group = new CommandGroup({
    matcher: matchPrefixes("!"),
    commands: [createReminderCommand(storage)]
  })

  const bot = new Bot({
    adapter,
    group
  })

  bot.on("error", error => {
    console.error(error)
  })

  return bot
}
