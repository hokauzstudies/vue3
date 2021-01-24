export class Storage {
  static set<T> (key: string, data: T) {
    if (!data) { return }
    return localStorage.setItem(key, JSON.stringify(data))
  }

  static get (key: string) {
    const data = localStorage.getItem(key)

    if (data) {
      return JSON.parse(data)
    }
    return null
  }

  static update<T> (key: string, data: T) {
    this.set(key, data)
  }

  static delete (key: string) {
    return localStorage.removeItem(key)
  }

  static drop () {
    return localStorage.clear()
  }
}
