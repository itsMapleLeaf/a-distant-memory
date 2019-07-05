import { Adapter } from "@enitoni/gears-discordjs"
import { join } from "path"
import { createBot } from "./bot/bot"
import { botToken } from "./env"
import { sleep } from "./helpers/sleep"
import { checkReminders } from "./reminder/check-reminders"
import { JsonReminderStorage } from "./reminder/json-reminder-storage"

async function main() {
  const adapter = new Adapter({ token: botToken })
  const storage = new JsonReminderStorage(join(__dirname, "../data.json"))

  const bot = createBot(adapter, storage)
  await bot.start()

  console.log("bot is runnin")

  while (true) {
    await checkReminders(bot, storage)
    await sleep(1000)
  }
}

main().catch(console.error)
