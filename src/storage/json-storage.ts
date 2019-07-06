import { readFile, writeFile } from "fs-extra"
import { Storage } from "./storage"

type StoredData<T> = {
  items: T[]
}

export class JsonStorage<T extends { id: string }> implements Storage<T> {
  constructor(private filePath: string) {}

  async save(item: T) {
    const data = await this.loadData()
    data.items.push(item)
    await this.saveData(data)
    return item
  }

  async remove(id: string) {
    const data = await this.loadData()
    data.items = data.items.filter(r => r.id != id)
    await this.saveData(data)
  }

  async findAll(predicate: (item: T) => boolean = () => true) {
    const data = await this.loadData()
    return data.items.filter(predicate)
  }

  private async loadData(): Promise<StoredData<T>> {
    const content = await readFile(this.filePath, "utf-8")
    return JSON.parse(content)
  }

  private async saveData(data: StoredData<T>) {
    return writeFile(this.filePath, JSON.stringify(data))
  }
}
