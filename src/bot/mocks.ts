import {
  AdapterEvents,
  AdapterHooks,
  AdapterResult,
  ClientAdapter,
  Emitter
} from "@enitoni/gears"

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

export class TestClient extends Emitter<AdapterEvents<TestDiscordMessage>> {
  async start() {
    this.emit("ready", undefined)
    this.emit("unready", undefined)
  }

  sendMessage(message: TestDiscordMessage) {
    this.emit("message", message)
  }
}

export class TestAdapter extends ClientAdapter<
  TestClient,
  TestDiscordMessage,
  TestClient
> {
  protected register(
    client: TestClient,
    hooks: AdapterHooks<TestDiscordMessage>
  ): AdapterResult<TestClient, TestDiscordMessage> {
    client.on("message", hooks.message)
    client.on("ready", hooks.ready)
    client.on("unready", hooks.unready)
    client.on("error", hooks.error)

    return {
      client,
      methods: {
        start: () => client.start(),
        getMessageContent: message => message.content
      }
    }
  }
}
