import { DiscordBot } from "./bot"
import { ReminderStorageService } from "./storage"

export async function checkReminders(
  bot: DiscordBot,
  storage: ReminderStorageService
) {
  for (const reminder of await storage.getAll()) {
    if (Date.now() >= reminder.remindOn) {
      await storage.remove(reminder.id)

      const sender = await bot.client.fetchUser(reminder.senderId)
      sender.sendMessage(`hi! here's your reminder: "${reminder.text}"`)
    }
  }
}
