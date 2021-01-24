export class Storage {
  static insert<T> (key: string, data: T) {
    return localStorage.setItem(key, JSON.stringify(data))
  }

  static read (key: string) {
    const data = localStorage.getItem(key)
    if (data) {
      return JSON.parse(data)
    }
    return null
  }

  static update<T> (key: string, data: T) {
    this.insert(key, data)
  }

  static delete (key: string) {
    return localStorage.removeItem(key)
  }

  static drop () {
    return localStorage.clear()
  }
}
