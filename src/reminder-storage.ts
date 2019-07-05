import uuid from "uuid/v4"

export type ReminderData = {
  id: string
  text: string
  senderId: string
  createdAt: number
  remindOn: number
}

export type ReminderStorage = {
  save(text: string, senderId: string, remindOn: number): Promise<ReminderData>
  remove(id: string): Promise<void>
  findAll(predicate?: (item: ReminderData) => boolean): Promise<ReminderData[]>
}

export class TestReminderStorage implements ReminderStorage {
  private items = new Map<string, ReminderData>()

  async save(text: string, senderId: string, remindOn: number) {
    const reminder = {
      id: uuid(),
      text,
      senderId,
      createdAt: Date.now(),
      remindOn
    }

    this.items.set(reminder.id, reminder)

    return reminder
  }

  async remove(id: string) {
    this.items.delete(id)
  }

  async findAll(predicate: (item: ReminderData) => boolean = () => true) {
    return [...this.items.values()].filter(predicate)
  }
}
