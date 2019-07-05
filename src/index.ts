import { Bot, matchPrefixes, matchRegex } from "@enitoni/gears"
import { Adapter, Command, CommandGroup } from "@enitoni/gears-discordjs"
import timestring from "timestring"
import { botToken } from "./env"

const adapter = new Adapter({
  token: botToken
})

const command = new Command({
  matcher: matchRegex(/^remind(me)?\s+/i),
  action: context => {
    const { message } = context

    const [, ...args] = message.content.split(" ")
    const time = args.join(" ")
    const seconds = timestring(time)

    message.channel.send(`${seconds} seconds`)
  }
})

const group = new CommandGroup({
  matcher: matchPrefixes("!"),
  commands: [command]
})

const bot = new Bot({ adapter, group })

bot.start().then(() => {
  console.log("bot is runnin")
})
