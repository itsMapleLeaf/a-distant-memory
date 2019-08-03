import { Bot, matchPrefixes } from "@enitoni/gears"
import { Adapter, CommandGroupBuilder } from "@enitoni/gears-discordjs"
import { join } from "path"
import { botToken } from "./env"
import { sleep } from "./helpers/sleep"
import { checkReminders } from "./reminder/check-reminders"
import { ReminderData } from "./reminder/reminder"
import { createReminderCommand } from "./reminder/reminder-command"
import { JsonStorage } from "./storage/json-storage"

async function main() {
  const storage = new JsonStorage<ReminderData>(join(__dirname, "../data.json"))

  const adapter = new Adapter({
    token: botToken,
  })

  const group = new CommandGroupBuilder()
    .match(matchPrefixes("!"))
    .setCommands(createReminderCommand(storage))
    .done()

  const bot = new Bot({
    adapter,
    commands: [group],
  })

  await bot.start()

  console.log("bot is runnin")

  while (true) {
    await checkReminders(bot.client, storage)
    await sleep(1000)
  }
}

main().catch(console.error)
