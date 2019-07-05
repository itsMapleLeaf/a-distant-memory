import { createBot, DiscordBot } from "./bot"
import { sleep } from "./sleep"
import { ReminderStorageService } from "./storage"

async function checkReminders(
  bot: DiscordBot,
  storage: ReminderStorageService
) {
  while (true) {
    await sleep(1000)

    for (const reminder of await storage.getAll()) {
      if (Date.now() >= reminder.remindOn) {
        await storage.remove(reminder.id)

        const sender = await bot.client.fetchUser(reminder.senderId)
        sender.sendMessage(`hi! here's your reminder: "${reminder.text}"`)
      }
    }
  }
}

async function main() {
  const storage = new ReminderStorageService()

  const bot = createBot(undefined, storage)
  await bot.start()

  console.log("bot is runnin")

  await checkReminders(bot, storage)
}

main().catch(console.error)
