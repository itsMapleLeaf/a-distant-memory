import { Client } from "discord.js"
import { Command, createCommandPrefixRegex, runCommand } from "./command"

export function createBot(commands: Command[]) {
  const client = new Client()

  client.on("message", async message => {
    const command = commands.find(command => {
      const prefixRegex = createCommandPrefixRegex(command.prefix)
      return prefixRegex.test(message.content)
    })

    if (command) {
      await runCommand(command, message)
    }
  })

  client.on("error", error => {
    console.error(error) // TODO: use an actual log file
  })

  return client
}
