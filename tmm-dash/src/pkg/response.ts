import firebase from 'firebase/app'
import 'firebase/auth'

export class Response<T> {
  OK?: boolean
  error?: boolean
  data?: T
  message?: string

  constructor (OK?: boolean, error?: boolean, data?: T, msg?: string) {
    this.OK = OK
    this.error = error
    this.data = data
    this.message = msg
  }
}

export class ResponseMaker {
  static success<T> (data: T, msg?: string): Response<T> { return new Response<T>(true, false, data, msg) }
  static error<T> (data: T, msg?: string): Response<T> { return new Response<T>(false, true, data, msg) }
}

export interface HttpContract {
  get<T>(url: string, header?: object): Promise<Response<T>> | undefined;
  post<T>(url: string, data?: T, headers?: object): Promise<Response<T>> | undefined;
  put<T>(url: string, data?: T, headers?: object): Promise<Response<T>> | undefined;
  delete<T>(url: string, headers?: object): Promise<Response<T>> | undefined;
}

export class FireResponseMaker {
  static verifyDoc<T> (doc: firebase.firestore.DocumentSnapshot, msg: string): Response<T | undefined> {
    return (!doc.exists)
      ? ResponseMaker.error<undefined>(undefined, msg)
      : ResponseMaker.success<T>(doc.data() as T)
  }

  static verifyColl<T> (coll: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>, msg: string): Response<T[] | undefined> {
    return (coll.empty)
      ? ResponseMaker.error<undefined>(undefined, msg)
      : ResponseMaker.success<T[]>(coll.docs.map(doc => doc.data() as T))
  }

  static verifyFirestoreSuccess<T> (msg: string, data?: T) {
    return ResponseMaker.success(data, msg)
  }

  static verifyFirestoreError (origin: string, e: firebase.firestore.FirestoreError, msg?: string): Response<undefined> {
    console.log(origin, e)

    const map = ['']
    const message = map.includes(e.code)
      ? msg
      : 'Algo inesperado aconteceu, por favor tente novamente'

    return ResponseMaker.error<undefined>(undefined, message)
  }
}
