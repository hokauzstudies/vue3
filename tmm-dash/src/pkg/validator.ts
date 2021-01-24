import { Regex } from './regex'
import { cpf as CPF, cnpj as CNPJ } from 'cpf-cnpj-validator'

export class Valitador {
  static email (email: string): boolean {
    return Regex.EMAIL.test(email)
  }

  static CPF (cpf: string | number): boolean {
    const data: string = (typeof (cpf) === 'string') ? cpf.replace(/\D/g, '') : cpf.toString()
    return CPF.isValid(data)
  }

  static CNPJ (cnpj: string | number): boolean {
    const data: string = (typeof (cnpj) === 'string') ? cnpj.replace(/\D/g, '') : cnpj.toString()
    return CNPJ.isValid(data)
  }

  static date (date: string | Date): boolean {
    // TODO: insert logic
    console.log(date)
    return false
  }

  static minDateExact (date: number | string | Date, min: string | Date): boolean {
    // TODO: insert logic
    console.log(date, min)
    return false
  }

  static minAge (date: number | string | Date, age: string | Date): boolean {
    // TODO: insert logic
    console.log(date, age)
    return false
  }

  static isXLSX (name: string): boolean {
    return Regex.XLSX.test(name.toLowerCase())
  }

  static isEven (n: number): boolean {
    return n % 2 === 0
  }

  static isOdd (n: number): boolean {
    return n % 2 !== 0
  }
}
