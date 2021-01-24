export class Formatter {
  static replaceDiacritics (str: string) {
    return str.normalize('NFKD').replace(/[^\w]/g, '')
  }

  static onlyNumbers (data: string): string {
    return data.replace(/\D/g, '')
  }

  static sanitize<T> (data: T): object {
    return JSON.parse(JSON.stringify(data))
  }
}
