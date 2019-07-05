import uuid from "uuid/v4"

type ReminderData = {
  id: string
  text: string
  senderId: string
  createdAt: number
  remindOn: number
}

export class ReminderStorageService {
  private items = new Map<string, ReminderData>()

  async save(text: string, senderId: string, remindOn: number) {
    const id = uuid()

    this.items.set(id, {
      id,
      text,
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
