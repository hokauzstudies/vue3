import { Response } from '@/pkg/response'

import { Sign } from '@/core/entity'

export interface UserUsecaseContract<T> {
  login (email: string, pass: string): Promise<Response<T | Sign | undefined>>;
  create (user: T): Promise<Response<Sign | undefined>>;
  read (uid: string): Promise<Response<T | undefined>>;
  readAll (): Promise<Response<T[] | undefined >>;
  update (user: T): Promise<Response<T | undefined>>;
  delete (uid: string): Promise<Response<undefined>>;
}
