import dotenv from "dotenv"
import { assertExists } from "./helpers/assert-exists"

dotenv.config()

function assertEnvVariable(name: string) {
  return assertExists(
    process.env[name],
    `Environment variable "${name}" has not been defined`,
  )
}

export const botToken = assertEnvVariable("BOT_TOKEN")
