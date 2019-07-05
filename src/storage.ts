import uuid from "uuid/v4"

type ReminderData = {
  id: string
  senderId: string
  createdAt: string
  remindOn: string
}

export class ReminderStorageService {
  private items = new Map<string, ReminderData>()

  async save(senderId: string, remindOn: string) {
    const id = uuid()

    this.items.set(id, {
      id,
      senderId,
      createdAt: new Date().toISOString(),
      remindOn
    })
  }

  async remove(id: string) {
    this.items.delete(id)
  }

  async getAll() {
    return [...this.items.values()]
  }
}
