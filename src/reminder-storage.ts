import uuid from "uuid/v4"

export type ReminderData = {
  id: string
  text: string
  senderId: string
  createdAt: number
  remindOn: number
}

export type ReminderStorage = {
  save(text: string, senderId: string, remindOn: number): Promise<void>
  remove(id: string): Promise<void>
  getAll(): Promise<ReminderData[]>
}

export class TestReminderStorage implements ReminderStorage {
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
