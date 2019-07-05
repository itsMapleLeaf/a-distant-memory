import { ReminderData } from "./reminder"
import { ReminderStorage } from "./reminder-storage"

export class TestReminderStorage implements ReminderStorage {
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
