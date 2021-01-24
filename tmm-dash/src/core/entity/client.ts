import { User } from './user'

export class Client implements User {
  uid: string;
  name: string;
  email: string;
  doc: string;
  docType: 'CPF' | 'CNPJ';
  _deactived: boolean;

  constructor (name: string, email: string, doc: string, docType: 'CPF' | 'CNPJ', uid: string) {
    this.name = name
    this.email = email
    this.doc = doc
    this.docType = docType
    this.uid = uid
    this._deactived = false
  }
}
