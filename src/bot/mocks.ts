export class TestDiscordChannel {
  messages: string[] = []

  send(message: string) {
    this.messages.push(message)
  }
}

export class TestDiscordMessage {
  author = {
    id: "dshajdklashjkl"
  }

  constructor(
    public content: string,
    public channel = new TestDiscordChannel()
  ) {}
}
