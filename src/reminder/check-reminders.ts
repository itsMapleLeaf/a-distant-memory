import { Client } from "discord.js"
import { Storage } from "../storage/storage"
import { ReminderData } from "./reminder"

export async function checkReminders(
  client: Client,
  storage: Storage<ReminderData>
) {
  const shouldRemind = (reminder: ReminderData) =>
    Date.now() >= reminder.remindOn

  for (const reminder of await storage.findAll(shouldRemind)) {
    await storage.remove(reminder.id)

    const sender = await client.fetchUser(reminder.senderId)
    sender.send(`hi! here's your reminder: "${reminder.text}"`)
  }
}
