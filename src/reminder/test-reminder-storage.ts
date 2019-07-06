import { Storage } from "../storage/storage"
import { ReminderData } from "./reminder"

export class TestReminderStorage implements Storage<ReminderData> {
  private items = new Map<string, ReminderData>()

  async save(reminder: ReminderData) {
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
