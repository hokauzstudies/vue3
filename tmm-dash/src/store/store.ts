export class State<T> {
  private data: T

  constructor () {
    this.data = {} as T
  }

  get () {
    return this.data as T
  }

  set (data: T) {
    this.data = { ...this.data, ...data }
  }

  update <T> (field: string, value: T) {
    if (field in this.data) {
      this.data = { ...this.data, [field]: value }
    }
  }

  delete (field: string) {
    if (field in this.data) {
      this.data = { ...this.data, [field]: undefined }
    }
  }
}
