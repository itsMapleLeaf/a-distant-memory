import { matchPrefixes } from "@enitoni/gears"
import { Command } from "@enitoni/gears-discordjs"
import { distanceInWordsToNow } from "date-fns"
import timestring from "timestring"
import { Storage } from "../storage/storage"
import { createReminder, ReminderData } from "./reminder"

export function createReminderCommand(storage: Storage<ReminderData>) {
  return new Command({
    matcher: matchPrefixes("remindme ", "remind "),
    action: async ({ message, content }) => {
      try {
        // TODO: perform rate limit check

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

        const dist = distanceInWordsToNow(reminder.remindOn)

        await storage.save(reminder)

        message.channel.send(
          `alright, i'll message you in ${dist} with the message: "${reminderText}"`
        )
      } catch (error) {
        console.error(error)
        message.channel.send(
          `sorry, i'm having trouble understanding that format.\n` +
            `here's the syntax: !remindme <time>, <message>`
        )
      }
    }
  })
}
