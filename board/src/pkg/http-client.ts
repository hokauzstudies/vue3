import axios from 'axios'

class Response<T> {
  OK?: boolean
  error?: boolean
  data?: T | object
  message?: string

  constructor (OK?: boolean, error?: boolean, data?: T | object, msg?: string) {
    this.OK = OK
    this.error = error
    this.data = data
    this.message = msg
  }
}

class ResponseMaker {
  static success<T> (data: T | object, msg?: string): Response<T> { return new Response<T>(true, false, data, msg) }
  static error<T> (data: T | object, msg?: string): Response<T> { return new Response<T>(false, true, data, msg) }
}

interface HttpContract {
  get<T>(url: string, header?: object): Promise<Response<T>> | undefined;
  post<T>(url: string, data?: T, headers?: object): Promise<Response<T>> | undefined;
  put<T>(url: string, data?: T, headers?: object): Promise<Response<T>> | undefined;
  patch<T>(url: string, data?: T, headers?: object): Promise<Response<T>> | undefined;
  delete<T>(url: string, headers?: object): Promise<Response<T>> | undefined;
}

export class HttpClient implements HttpContract {
  private useResponse: boolean

  constructor (useResponse: boolean) {
    this.useResponse = useResponse
  }

  async get<T> (url: string, headers?: object) {
    return axios.get(url, { headers })
      .then((res) => this.useResponse ? ResponseMaker.success<T>(res.data) : res.data)
      .catch((e) => this.useResponse ? ResponseMaker.error<T>(e) : e)
  }

  async post<T> (url: string, data?: T, headers?: object) {
    return axios.post(url, data, { headers })
      .then((res) => this.useResponse ? ResponseMaker.success<T>(res.data) : res.data)
      .catch((e) => this.useResponse ? ResponseMaker.error<T>(e) : e)
  }

  async put<T> (url: string, data?: T, headers?: object) {
    return axios.put(url, data, { headers })
      .then((res) => this.useResponse ? ResponseMaker.success<T>(res.data) : res.data)
      .catch((e) => this.useResponse ? ResponseMaker.error<T>(e) : e)
  }

  async patch<T> (url: string, data?: T, headers?: object) {
    return axios.patch(url, data, { headers })
      .then((res) => this.useResponse ? ResponseMaker.success<T>(res.data) : res.data)
      .catch((e) => this.useResponse ? ResponseMaker.error<T>(e) : e)
  }

  async delete<T> (url: string, headers?: object) {
    return axios.delete(url, { headers })
      .then((res) => this.useResponse ? ResponseMaker.success<T>(res.data) : res.data)
      .catch((e) => this.useResponse ? ResponseMaker.error<T>(e) : e)
  }

  private prepare<T> (req: Promise<T>) {
    console.log(req)
    return null
  }
}
