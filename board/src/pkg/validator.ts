export class Valitador {
  static email (email: string): boolean {
    email.match('')
    // TODO: insert logic
    return false
  }

  static CPF (cpf: string | number): boolean {
    const data: number = (typeof (cpf) === 'string') ? +cpf.replace(/\D/g, '') : cpf
    // TODO: insert logic
    console.log(data)
    return false
  }

  static CNPJ (cnpj: string | number): boolean {
    const data: number = (typeof (cnpj) === 'string') ? +cnpj.replace(/\D/g, '') : cnpj
    // TODO: insert logic
    console.log(data)
    return false
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
}
