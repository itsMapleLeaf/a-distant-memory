import { DiscordBot } from "./bot"
import { ReminderStorage } from "./reminder-storage"

export async function checkReminders(
  bot: DiscordBot,
  storage: ReminderStorage
) {
  for (const reminder of await storage.getAll()) {
    if (Date.now() >= reminder.remindOn) {
      await storage.remove(reminder.id)

      const sender = await bot.client.fetchUser(reminder.senderId)
      sender.send(`hi! here's your reminder: "${reminder.text}"`)
    }
  }
}
