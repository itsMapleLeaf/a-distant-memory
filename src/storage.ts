import uuid from "uuid/v4"

type ReminderData = {
  id: string
  senderId: string
  createdAt: number
  remindOn: number
}

export class ReminderStorageService {
  private items = new Map<string, ReminderData>()

  async save(senderId: string, remindOn: number) {
    const id = uuid()

    this.items.set(id, {
      id,
      senderId,
      createdAt: Date.now(),
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
