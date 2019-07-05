import { readFile, writeFile } from "fs-extra"
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

type StoredReminders = {
  reminders: ReminderData[]
}

export class JSONReminderStorage implements ReminderStorage {
  constructor(private filePath: string) {}

  private async loadData(): Promise<StoredReminders> {
    const content = await readFile(this.filePath, "utf-8")
    return JSON.parse(content)
  }

  private async saveData(data: StoredReminders) {
    return writeFile(this.filePath, JSON.stringify(data))
  }

  async save(text: string, senderId: string, remindOn: number) {
    const reminder = {
      id: uuid(),
      text,
      senderId,
      createdAt: Date.now(),
      remindOn
    }

    const data = await this.loadData()
    data.reminders.push(reminder)
    await this.saveData(data)

    return reminder
  }

  async remove(id: string) {
    const data = await this.loadData()
    data.reminders = data.reminders.filter(r => r.id != id)
    await this.saveData(data)
  }

  async findAll(predicate: (item: ReminderData) => boolean = () => true) {
    const data = await this.loadData()
    return data.reminders.filter(predicate)
  }
}
