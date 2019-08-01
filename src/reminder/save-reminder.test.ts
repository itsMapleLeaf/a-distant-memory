import * as messages from "./messages"
import { saveReminder } from "./save-reminder"

async function setup(message: string) {
  return saveReminder(message, "123")
}

test("saveReminder", async () => {
  const result = await setup("1 minute, do the thing")
  expect(result.message[0]).toBe(messages.reminderRegistered)
})

test("saveReminder - no reminder text", async () => {
  const result = await setup("1 minute")
  expect(result.message[0]).toBe(messages.noReminderText)
})

test("saveReminder - invalid format", async () => {
  const result = await setup("82 frickseconds, hello")
  expect(result.message[0]).toBe(messages.invalidFormat)
})

test("saveReminder - big numbers", async () => {
  const result = await setup(
    "9999999999999999999999999999999 years, prepare for heat death of the universe",
  )
  expect(result.message[0]).toBe(messages.tooMuchTime)
})
