import { Message } from "discord.js"
import timestring from "timestring"
import { Command } from "../bot/command"
import { Storage } from "../storage/storage"
import { createReminderEmbed } from "./create-reminder-embed"
import { createReminder, ReminderData } from "./reminder"

export function createReminderCommand(storage: Storage<ReminderData>): Command {
  async function handleReminderCommand(message: Message, content: string) {
    try {
      // TODO: limit reminders per user

      const [time, ...reminderTextRaw] = content.split(",")
      const reminderText = reminderTextRaw.join(",").trim()

      if (!reminderText) {
        throw new Error("no reminder text")
      }

      const timeFromNow = timestring(time, "ms")

      const reminder = createReminder(
        reminderText,
        message.author.id,
        timeFromNow
      )

      if (reminder.remindOn >= Number.MAX_SAFE_INTEGER) {
        message.channel.send(
          `that's way too much time! enter in something lower, thanks ♥`
        )
        return
      }

      await storage.save(reminder)

      message.channel.send(
        `reminder registered!`,
        createReminderEmbed(reminder)
      )
    } catch (error) {
      message.channel.send(
        `sorry, i'm having trouble understanding that format.\n` +
          `here's the syntax: !remindme <time>, <message>`
      )
    }
  }

  return {
    prefix: "remindme",
    handler: handleReminderCommand
  }
}
