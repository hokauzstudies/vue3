import { Firestore } from '@/pkg/firestore'
import { Formatter } from '@/pkg/formatter'
import { Response, ResponseMaker } from '@/pkg/response'

import { Client, Sign } from '@/core/entity'
import { AuthUsecase } from '@/core/usecase/auth/auth.usecase'
import { UserUsecaseContract } from '@/core/usecase/user/user.usecase'

export class ClientUsecase extends AuthUsecase implements UserUsecaseContract<Client> {
  coll: string

  constructor (collName: string) {
    super()
    this.coll = collName
  }

  async login (email: string, pass: string): Promise<Response<Client | Sign | undefined>> {
    const res = await super.signin(email, pass)

    if (this.hasError(res)) return res

    const res2 = await this.read(res.data?.uid as string)
    if (res2.data?._deactived) {
      return ResponseMaker.error(undefined, 'Usuário inativo')
    }

    super.persisteLogin(res2.data)
    return res2
  }

  async create (user: Client): Promise<Response<Client | Sign | undefined>> {
    const res = await super.signup(user.email, Formatter.onlyNumbers(user.doc))

    if (res.error || !res.data?.uid) return res
    user.uid = res.data.uid

    const path = Firestore.makePath([this.coll, user.uid])
    return Firestore.create<Client>(path, user, '[CLIENT CREATE]', 'Cliente adicionado com sucesso', 'Algo inesperado aconteceu!')
  }

  async read (uid: string): Promise<Response<Client | undefined >> {
    const path = Firestore.makePath([this.coll, uid])
    return Firestore.get<Client>(path, '[CLIENT READ]', 'Usuário não encontrado!', 'Algo inesperado aconteceu!')
  }

  async readAll (): Promise<Response<Client[] | undefined >> {
    return Firestore.getAll<Client>(this.coll, '[CLIENT READALL]', 'Nenhum cliente cadastrado até o momento!', 'Algo inesperado aconteceu!')
  }

  async update (user: Client): Promise<Response<Client | undefined >> {
    const path = Firestore.makePath([this.coll, user.uid])
    return Firestore.update<Client>(path, user, '[CLIENT UPDATE]', 'Cliente atualizado com sucesso!', 'Algo inesperado aconteceu!')
      .then(res => res.OK ? this.read(user.uid) : res)
  }

  async delete (uid: string): Promise<Response<undefined >> {
    const path = Firestore.makePath([this.coll, uid])
    return Firestore.delete(path, '[CLIENT DELETE]', 'Cliente removido com sucesso! Este cliente não poderá mais acessar o sistema.', 'Algo inesperado aconteceu!')
  }

  private hasError (res: Response<Client | Sign | undefined>): boolean {
    return res.error || !res.data?.uid
  }
}
