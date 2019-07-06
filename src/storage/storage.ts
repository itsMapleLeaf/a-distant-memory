export type Storage<T> = {
  save(item: T): Promise<T>
  remove(id: string): Promise<void>
  findAll(predicate?: (item: T) => boolean): Promise<T[]>
}
