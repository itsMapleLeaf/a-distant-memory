import { createBot } from "./bot"
import { checkReminders } from "./check-reminders"
import { sleep } from "./sleep"
import { ReminderStorageService } from "./storage"

async function main() {
  const storage = new ReminderStorageService()

  const bot = createBot(undefined, storage)
  await bot.start()

  console.log("bot is runnin")

  while (true) {
    await checkReminders(bot, storage)
    await sleep(1000)
  }
}

main().catch(console.error)
