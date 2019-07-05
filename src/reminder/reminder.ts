import uuid from "uuid/v4"

export type ReminderData = {
  id: string
  text: string
  senderId: string
  createdAt: number
  remindOn: number
}

export function createReminder(
  text: string,
  senderId: string,
  timeFromNow: number
): ReminderData {
  const now = Date.now()
  return {
    id: uuid(),
    text,
    senderId,
    createdAt: now,
    remindOn: now + timeFromNow
  }
}
