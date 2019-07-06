import { Storage } from "./storage"

export class TestStorage<T extends { id: string }> implements Storage<T> {
  private items = new Map<string, T>()

  async save(item: T) {
    this.items.set(item.id, item)
    return item
  }

  async remove(id: string) {
    this.items.delete(id)
  }

  async findAll(predicate: (item: T) => boolean = () => true) {
    return [...this.items.values()].filter(predicate)
  }
}
