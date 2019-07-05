import { Bot, matchPrefixes } from "@enitoni/gears"
import { Adapter, Command, CommandGroup } from "@enitoni/gears-discordjs"
import { botToken } from "./env"

const adapter = new Adapter({
  token: botToken
})

const command = new Command({
  matcher: matchPrefixes("test"),
  action: context => {
    const { message } = context
    message.channel.send("Test received!")
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
