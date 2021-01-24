import { Firestore } from '@/pkg/firestore'
import { Formatter } from '@/pkg/formatter'
import { Response } from '@/pkg/response'

import { Admin, Sign } from '@/core/entity'
import { AuthUsecase } from '@/core/usecase/auth/auth.usecase'
import { UserUsecaseContract } from '@/core/usecase/user/user.usecase'

export class AdminUsecase extends AuthUsecase implements UserUsecaseContract<Admin> {
  coll: string

  constructor (collName: string) {
    super()
    this.coll = collName
  }

  async login (email: string, pass: string): Promise<Response<Admin | Sign | undefined>> {
    const res = await super.signin(email, pass)
    if (res.error || !res.data?.uid) return res

    const res2 = await this.read(res.data.uid)
    super.persisteLogin(res2.data)

    return res2
  }

  async create (user: Admin): Promise<Response<Admin | Sign | undefined>> {
    const res = await super.signup(user.email, Formatter.onlyNumbers(user.pass))

    if (res.error || !res.data?.uid) return res
    user.pass = ''
    user.uid = res.data.uid

    const path = this.makePath(user.uid)
    return Firestore.create<Admin>(path, user, '[ADMIN CREATE]', 'Admin adicionado com sucesso', 'Algo inesperado aconteceu!')
  }

  async read (uid: string): Promise<Response<Admin | undefined >> {
    const path = this.makePath(uid)
    return Firestore.get<Admin>(path, '[ADMIN READ]', 'Usuário não encontrado!', 'Algo inesperado aconteceu!')
  }

  async readAll (): Promise<Response<Admin[] | undefined >> {
    return Firestore.getAll<Admin>(this.coll, '[ADMIN READALL]', 'Nenhum admin cadastrado até o momento!', 'Algo inesperado aconteceu!')
  }

  async update (user: Admin): Promise<Response<Admin | undefined >> {
    const path = this.makePath(user.uid)
    return Firestore.update<Admin>(path, user, '[ADMIN UPDATE]', 'Admin atualizado com sucesso!', 'Algo inesperado aconteceu!')
      .then(res => res.OK ? this.read(user.uid) : res)
  }

  async delete (uid: string): Promise<Response<undefined >> {
    const path = this.makePath(uid)
    return Firestore.delete(path, '[ADMIN DELETE]', 'Admin removido com sucesso! Este cliente não poderá mais acessar o sistema.', 'Algo inesperado aconteceu!')
  }

  private makePath (uid: string): string {
    return `${this.coll}/${uid}`
  }
}
