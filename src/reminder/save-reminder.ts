import { RichEmbed } from "discord.js"
import timestring from "timestring"
import { createReminderEmbed } from "./create-reminder-embed"
import * as messages from "./messages"
import { createReminder, ReminderData } from "./reminder"

export type SaveReminderResult =
  | {
      type: "success"
      message: (string | RichEmbed)[]
      reminder: ReminderData
    }
  | {
      type: "error"
      message: (string | RichEmbed)[]
    }

export function saveReminder(
  content: string,
  authorId: string,
): SaveReminderResult {
  try {
    // TODO: limit reminders per user

    const [time, ...reminderTextRaw] = content.split(",")
    const reminderText = reminderTextRaw.join(",").trim()

    if (!reminderText) {
      return { type: "error", message: [messages.noReminderText] }
    }

    const timeFromNow = timestring(time, "ms")

    const reminder = createReminder(reminderText, authorId, timeFromNow)

    if (reminder.remindOn >= Number.MAX_SAFE_INTEGER) {
      return { type: "error", message: [messages.tooMuchTime] }
    }

    return {
      type: "success",
      message: [messages.reminderRegistered, createReminderEmbed(reminder)],
      reminder,
    }
  } catch (error) {
    return { type: "error", message: [messages.invalidFormat] }
  }
}
