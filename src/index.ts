import { createBot } from "./bot"

createBot()
  .start()
  .then(() => {
    console.log("bot is runnin")
  })
