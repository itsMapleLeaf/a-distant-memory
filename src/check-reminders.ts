import { DiscordBot } from "./bot"
import { ReminderData, ReminderStorage } from "./reminder-storage"

export async function checkReminders(
  bot: DiscordBot,
  storage: ReminderStorage
) {
  const shouldRemind = (reminder: ReminderData) =>
    Date.now() >= reminder.remindOn

  for (const reminder of await storage.findAll(shouldRemind)) {
    await storage.remove(reminder.id)

    const sender = await bot.client.fetchUser(reminder.senderId)
    sender.send(`hi! here's your reminder: "${reminder.text}"`)
  }
}
