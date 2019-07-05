import { Bot, ClientAdapter, matchPrefixes, matchRegex } from "@enitoni/gears"
import { Adapter, Command, CommandGroup } from "@enitoni/gears-discordjs"
import { distanceInWordsToNow } from "date-fns"
import { Client, Message } from "discord.js"
import timestring from "timestring"
import { botToken } from "./env"

type DiscordClientAdapter = ClientAdapter<Client, Message>

function createDiscordAdapter() {
  return new Adapter({
    token: botToken
  })
}

export function createBot(
  adapter: DiscordClientAdapter = createDiscordAdapter()
) {
  const command = new Command({
    matcher: matchRegex(/^remind(me)?\b/i),
    action: ({ message, content }) => {
      try {
        const [time, ...reminderTextRaw] = content.split(",")
        const reminderText = reminderTextRaw.join(",").trim()

        if (!reminderText) {
          throw new Error("no reminder text")
        }

        const ms = timestring(time, "ms")
        const dist = distanceInWordsToNow(Date.now() + ms)

        message.channel.send(
          `alright, i'll message you in ${dist} with the message: "${reminderText}"`
        )
      } catch {
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
