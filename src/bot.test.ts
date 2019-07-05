import { createBot } from "./bot"
import {
  TestAdapter,
  TestClient,
  TestDiscordChannel,
  TestDiscordMessage
} from "./mocks"
import { TestReminderStorage } from "./reminder-storage"
import { flushPromises } from "./test-utils"

async function createTestBot() {
  const client = new TestClient()
  const bot = createBot(
    new TestAdapter(client) as any,
    new TestReminderStorage()
  )
  await bot.start()
  return { client, bot }
}

describe("bot", () => {
  it.skip("accepts !remind or !remindme", async () => {
    const { client } = await createTestBot()

    const channel = new TestDiscordChannel()
    client.sendMessage(new TestDiscordMessage("!remind 1 year", channel))
    client.sendMessage(new TestDiscordMessage("!remindme 1 year", channel))

    await flushPromises()

    expect(channel.messages).toHaveLength(2)
  })

  it.skip("ignores other !remind prefixes", async () => {
    const { client } = await createTestBot()

    const channel = new TestDiscordChannel()
    client.sendMessage(
      new TestDiscordMessage("!reminddjklsfjklsdf 1 year", channel)
    )
    client.sendMessage(new TestDiscordMessage("!remindwat 1 year", channel))

    await flushPromises()

    expect(channel.messages).toHaveLength(0)
  })
})
