import { Bot, ClientAdapter, matchPrefixes, matchRegex } from "@enitoni/gears"
import { Adapter, Command, CommandGroup } from "@enitoni/gears-discordjs"
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
    matcher: matchRegex(/^remind(me)?\s+/i),
    action: ({ message, content }) => {
      const [, ...args] = content.split(" ")
      const time = args.join(" ")
      const seconds = timestring(time)

      message.channel.send(`${seconds} seconds`)
    }
  })

  const group = new CommandGroup({
    matcher: matchPrefixes("!"),
    commands: [command]
  })

  return new Bot({ adapter, group })
}
