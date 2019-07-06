import { join } from "path"
import { createBot } from "./bot/bot"
import { botToken } from "./env"
import { sleep } from "./helpers/sleep"
import { checkReminders } from "./reminder/check-reminders"
import { ReminderData } from "./reminder/reminder"
import { createReminderCommand } from "./reminder/reminder-command"
import { JsonStorage } from "./storage/json-storage"

async function main() {
  const storage = new JsonStorage<ReminderData>(join(__dirname, "../data.json"))

  const client = createBot([createReminderCommand(storage)])

  await client.login(botToken)

  console.log("bot is runnin")

  while (true) {
    await checkReminders(client, storage)
    await sleep(1000)
  }
}

main().catch(console.error)
