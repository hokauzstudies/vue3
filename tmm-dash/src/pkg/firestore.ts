import firebase from 'firebase/app'
import 'firebase/firestore'

import { Formatter } from './formatter'
import { FireResponseMaker, Response } from '@/pkg/response'

export class Query {
  prop: string;
  value: string;
  condition: firebase.firestore.WhereFilterOp;

  constructor (
    prop: string,
    condition: firebase.firestore.WhereFilterOp,
    value: string
  ) {
    this.prop = prop
    this.value = value
    this.condition = condition
  }
}

export class Firestore {
  static makePath (str: string[]): string {
    return str.join('/')
  }

  static async get<T> (path: string, origin: string, errorThenMsg: string, errorCatchMsg: string): Promise<Response<T | undefined>> {
    return firebase.firestore()
      .doc(path)
      .get()
      .then(doc => FireResponseMaker.verifyDoc<T>(doc, errorThenMsg))
      .catch(e => FireResponseMaker.verifyFirestoreError(origin, e, errorCatchMsg))
  }

  static async getAll<T> (path: string, origin: string, errorThenMsg: string, errorCatchMsg: string): Promise<Response<T[] | undefined>> {
    return firebase.firestore()
      .collection(path)
      .get()
      .then(coll => FireResponseMaker.verifyColl<T>(coll, errorThenMsg))
      .catch(e => FireResponseMaker.verifyFirestoreError(origin, e, errorCatchMsg))
  }

  static async create<T> (path: string, data: T, origin: string, successMsg: string, errorCatchMsg: string): Promise<Response<T | undefined>> {
    return firebase.firestore()
      .doc(path)
      .set(Formatter.sanitize(data))
      .then(() => FireResponseMaker.verifyFirestoreSuccess<T>(successMsg))
      .catch(e => FireResponseMaker.verifyFirestoreError(origin, e, errorCatchMsg))
  }

  static async createIn<T> (path: string, data: T, origin: string, successMsg: string, errorCatchMsg: string): Promise<Response<T | undefined>> {
    return firebase.firestore()
      .collection(path)
      .add(Formatter.sanitize(data))
      .then(doc => Firestore.simpleUpdate<T>(path, data, doc))
      .then(() => FireResponseMaker.verifyFirestoreSuccess<T>(successMsg))
      .catch(e => FireResponseMaker.verifyFirestoreError(origin, e, errorCatchMsg))
  }

  static simpleUpdate<T> (path: string, data: T, doc: firebase.firestore.DocumentReference) {
    const up = { ...data, id: doc.id }
    const upPath = `${path}/${up.id}`
    firebase.firestore().doc(upPath).update(up)
    return doc
  }

  static async update<T> (path: string, data: T, origin: string, successMsg: string, errorCatchMsg: string): Promise<Response<T | undefined>> {
    return firebase.firestore()
      .doc(path)
      .update(Formatter.sanitize(data))
      .then(() => Firestore.get(path, '', '', ''))
      .then(() => FireResponseMaker.verifyFirestoreSuccess<T>(successMsg))
      .catch(e => FireResponseMaker.verifyFirestoreError(origin, e, errorCatchMsg))
  }

  static async delete<T> (path: string, origin: string, successMsg: string, errorCatchMsg: string): Promise<Response<T | undefined>> {
    return firebase.firestore()
      .doc(path)
      .delete()
      .then(() => FireResponseMaker.verifyFirestoreSuccess<T>(successMsg))
      .catch(e => FireResponseMaker.verifyFirestoreError(origin, e, errorCatchMsg))
  }

  static async searchIn<T> (path: string, queries: Query[], origin: string, errorThenMsg: string, errorCatchMsg: string) {
    const ref = Firestore.makeRefWhere(path, queries)
    if (!ref) return

    return ref
      .get()
      .then(coll => FireResponseMaker.verifyColl<T>(coll, errorThenMsg))
      .catch(e => FireResponseMaker.verifyFirestoreError(origin, e, errorCatchMsg))
  }

  static makeRefWhere (path: string, queries: Query[]) {
    const first = queries.shift()
    if (!first) return

    let ref = firebase.firestore().collection(path)
      .where(first.prop, first.condition, first.value)

    queries.forEach(query => {
      ref = ref.where(query.prop, query.condition, query.value)
    })

    return ref
  }
}
