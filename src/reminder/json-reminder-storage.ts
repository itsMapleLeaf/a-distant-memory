import { readFile, writeFile } from "fs-extra"
import { Storage } from "../storage/storage"
import { ReminderData } from "./reminder"

type StoredReminders = {
  reminders: ReminderData[]
}

export class JsonReminderStorage implements Storage<ReminderData> {
  constructor(private filePath: string) {}

  async save(reminder: ReminderData) {
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

  private async loadData(): Promise<StoredReminders> {
    const content = await readFile(this.filePath, "utf-8")
    return JSON.parse(content)
  }

  private async saveData(data: StoredReminders) {
    return writeFile(this.filePath, JSON.stringify(data))
  }
}
