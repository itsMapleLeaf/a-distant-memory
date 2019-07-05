import { Bot, ClientAdapter, matchPrefixes } from "@enitoni/gears"
import { Command, CommandGroup } from "@enitoni/gears-discordjs"
import { distanceInWordsToNow } from "date-fns"
import { Client, Message } from "discord.js"
import timestring from "timestring"
import { ReminderStorage } from "./reminder-storage"

export type DiscordBot = Bot<Message, Client>

export type DiscordClientAdapter = ClientAdapter<Client, Message>

export function createBot(
  adapter: DiscordClientAdapter,
  storage: ReminderStorage
) {
  const command = new Command({
    matcher: matchPrefixes("remindme ", "remind "),
    action: async ({ message, content }) => {
      try {
        // TODO: perform rate limit check

        const [time, ...reminderTextRaw] = content.split(",")
        const reminderText = reminderTextRaw.join(",").trim()

        if (!reminderText) {
          throw new Error("no reminder text")
        }

        const ms = timestring(time, "ms")
        const remindOn = Date.now() + ms

        if (remindOn >= Number.MAX_SAFE_INTEGER) {
          message.channel.send(
            `that's way too much time! enter in something lower, thanks ♥`
          )
          return
        }

        const dist = distanceInWordsToNow(remindOn)

        await storage.save(reminderText, message.author.id, remindOn)

        message.channel.send(
          `alright, i'll message you in ${dist} with the message: "${reminderText}"`
        )
      } catch (error) {
        console.error(error)
        message.channel.send(
          `sorry, i'm having trouble understanding that format.\n` +
            `here's the syntax: !remindme <time>, <message>`
        )
      }
    }
  })

  const group = new CommandGroup({
    matcher: matchPrefixes("!"),
    commands: [command]
  })

  const bot = new Bot({ adapter, group })

  bot.on("error", error => {
    console.error(error)
  })

  return bot
}
