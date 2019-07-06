import { DiscordBot } from "../bot/bot"
import { Storage } from "../storage/storage"
import { ReminderData } from "./reminder"

export async function checkReminders(
  bot: DiscordBot,
  storage: Storage<ReminderData>
) {
  const shouldRemind = (reminder: ReminderData) =>
    Date.now() >= reminder.remindOn

  for (const reminder of await storage.findAll(shouldRemind)) {
    await storage.remove(reminder.id)

    const sender = await bot.client.fetchUser(reminder.senderId)
    sender.send(`hi! here's your reminder: "${reminder.text}"`)
  }
}
