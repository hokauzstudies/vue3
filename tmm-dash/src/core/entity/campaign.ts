import { Formatter } from '@/pkg/formatter'

export class Campaign {
  id?: string;
  name: string;
  clientUID: string;
  clientName: string;
  startDate: string;
  terms: string[];

  constructor (
    name: string,
    startDate: string,
    clientUID: string,
    clientName: string,
    id?: string
  ) {
    this.name = name
    this.startDate = startDate
    this.clientUID = clientUID
    this.clientName = clientName
    this.id = id
    this.terms = this.name.split(' ').map(word => Formatter.replaceDiacritics(word).toLocaleLowerCase())
  }
}

export class Report {
  origin: string;
  constructor (origin: string) {
    this.origin = origin
  }
}
