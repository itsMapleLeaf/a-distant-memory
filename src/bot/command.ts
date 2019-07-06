import { Message } from "discord.js"

export type Command = {
  prefix: string
  handler: (message: Message, content: string) => Promise<void>
}

export async function runCommand(command: Command, message: Message) {
  const prefixRegex = createCommandPrefixRegex(command.prefix)
  const content = message.content.replace(prefixRegex, "")
  await command.handler(message, content)
}

export const createCommandPrefixRegex = (prefix: string) =>
  new RegExp(`^!${prefix}\\s+`)
