import { Client } from "discord.js"
import { createReminderEmbed } from "./create-reminder-embed"
import { ReminderData } from "./reminder"
import { ReminderStorage } from "./reminder-storage"

export async function checkReminders(client: Client, storage: ReminderStorage) {
  const shouldRemind = (reminder: ReminderData) =>
    Date.now() >= reminder.remindOn

  for (const reminder of await storage.findAll(shouldRemind)) {
    await storage.remove(reminder.id)

    const sender = await client.fetchUser(reminder.senderId)
    sender.send(`hi! here's your reminder:`, createReminderEmbed(reminder))
  }
}
