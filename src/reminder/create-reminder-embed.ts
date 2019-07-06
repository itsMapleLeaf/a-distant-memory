import { distanceInWords, format } from "date-fns"
import { RichEmbed } from "discord.js"
import { ReminderData } from "./reminder"

export function createReminderEmbed(reminder: ReminderData) {
  const dateFormat = "MMMM Do, YYYY, H:mm:ssa"
  const createDate = format(reminder.createdAt, dateFormat)
  const remindDate = format(reminder.remindOn, dateFormat)

  const distanceToNow = distanceInWords(reminder.createdAt, reminder.remindOn, {
    addSuffix: true
  })

  return new RichEmbed()
    .setColor("#34495e")
    .setTitle(reminder.text)
    .addField("created at:", createDate)
    .addField("reminding on:", `${remindDate} (${distanceToNow})`)
}
