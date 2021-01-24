import firebase from 'firebase/app'
import 'firebase/auth'

import { Response, ResponseMaker } from '@/pkg/response'
import { Storage } from '@/pkg/storage'

import { Sign } from '@/core/entity'
export class AuthUsecase {
  protected async signin (email: string, pass: string): Promise<Response<Sign | undefined>> {
    return firebase.auth()
      .signInWithEmailAndPassword(email, pass)
      .then(res => this.verifyAuthSuccess(res, 'Email ou senha não confere'))
      .catch(e => this.verifyAuthError('[AUTH SIGNIN]', e))
  }

  protected async signup (email: string, pass: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(res => this.verifyAuthSuccess(res))
      .catch(e => this.verifyAuthError('[AUTH SIGNUP]', e))
  }

  async recover (email: string) {
    return firebase.auth().sendPasswordResetEmail(email)
      .then(() => this.verifyAuthSuccess(undefined, 'Email foi enviado com sucesso'))
      .catch(e => this.verifyAuthError('[AUTH RECOVER]', e))
  }

  async logout () {
    localStorage.clear()
    firebase.auth().signOut()
  }

  private verifyAuthSuccess (res?: firebase.auth.UserCredential, msg?: string): Response<Sign | undefined> {
    return (!res || !res.user)
      ? ResponseMaker.error<undefined>(undefined, msg)
      : ResponseMaker.success<Sign>(new Sign(res.user.uid))
  }

  private verifyAuthError (origin: string, e: firebase.auth.Error): Response<undefined> {
    console.log(origin, e)

    const map: { [key: string]: string} = {
      'auth/email-already-in-use': 'Email já em uso por outro usuário',
      'auth/wrong-password': 'Email ou senha não confere',
      'auth/user-not-found': 'Usuário não encontrado'
    }

    const message = map[e.code] || 'Algo inesperado aconteceu, por favor tente novamente'

    return ResponseMaker.error<undefined>(undefined, message)
  }

  protected persisteLogin<T> (data: T) {
    Storage.set<T>('current', data)
  }

  protected invalidLogin (res: Response<Sign | undefined>): boolean {
    return res.error || !res.data?.uid
  }

  isLogged (): boolean {
    return !!Storage.get('current')
  }

  isAdmin (): boolean {
    const user = Storage.get('current')
    return (user && user.role && user.role === 'ADMIN')
  }
}
