import xlsx, { ParsingOptions } from 'xlsx'

import { Valitador } from './validator'
import { Formatter } from './formatter'

export interface RowKey {
  name: string;
  slug: string;
  local_id?: number;
}

interface ResultFromXLSX {
  keys: RowKey[];
  rows: object[];
}

export class Reader {
  async XLSX (event: Event): Promise<ResultFromXLSX> {
    return this.prepareFiles(event)
      .then(files => this.getFile(files))
      .then(file => this.checkFileType(file))
      .then(file => this.read(file))
      .catch(e => e)
  }

  private async prepareFiles (event: Event): Promise<FileList | null> {
    const elem = event.target as HTMLInputElement
    return elem.files
  }

  private getFile (files: FileList | null): File {
    if (!files) { throw new Error('Arquivo não encontrado') }
    return files[0]
  }

  private checkFileType (file: File): File {
    if (!Valitador.isXLSX(file.name)) { throw new Error('Este não é um arquivo excell') }
    return file
  }

  private async read (file: File): Promise<ResultFromXLSX> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const sheet = this.loadSheet(reader)
          const res = this.processSheet(sheet as object[])
          resolve(res)
        } catch (e) {
          reject(e)
        }
      }

      reader.readAsBinaryString(file)
    })
  }

  private loadSheet (reader: FileReader): object[] {
    const data = reader.result
    const opts = { type: 'binary' } as ParsingOptions
    const bloc = xlsx.read(data, opts)
    const name = bloc.SheetNames[0]
    const sheet = xlsx.utils.sheet_to_json(bloc.Sheets[name])

    if (!sheet) throw new Error('A planilha está vazia')
    return sheet as object[]
  }

  private processSheet (sheet: object[]): ResultFromXLSX {
    const first = sheet.shift()
    if (!first) throw new Error('Nenhuma linha encontrada na planilha')

    const keys = this.processkeys(first)
    const rows = this.processRows(sheet)

    return { keys, rows }
  }

  private processRows (sheet: object[]) {
    return sheet.map((row) => this.renameKeys(row))
  }

  private processkeys (obj: object) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    return Object.keys(obj).map((name, i) => ({ name, slug: this.processSlug(name), local_id: i }))
  }

  private processSlug (name: string) {
    return Formatter.replaceDiacritics(name.toLowerCase().replace(' ', '_'))
  }

  private renameKeys (obj: object): object {
    return Object.fromEntries(
      Object.entries(obj)
        .map(([key, value]) => [`${this.processSlug(key)}`, value])
        // eslint-disable-next-line @typescript-eslint/camelcase
        .map((item, i) => ({ ...item, local_id: i }))
    )
  }
}
