import { ReminderData } from "./reminder"

export type ReminderStorage = {
  save(reminder: ReminderData): Promise<ReminderData>
  remove(id: string): Promise<void>
  findAll(predicate?: (item: ReminderData) => boolean): Promise<ReminderData[]>
}
