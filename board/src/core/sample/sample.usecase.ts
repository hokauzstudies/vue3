import { HttpClient } from '@/pkg/http-client'
import { Sample } from '@/core/entity/sample'

export interface ApiDefaultResponse<T> {
  status: string;
  data: object | T;
  message?: string;
}

export class UsecaseSample {
  private http = new HttpClient(false)
  private path = 'http://localhost:3000/api/v1/sample'
  private headers = { 'Content-Type': 'application/json' }

  create (data: Sample) {
    const url = this.path
    return this.http.post(url, data)
  }

  read (id: string) {
    const url = `${this.path}/${id}`
    return this.http.get<ApiDefaultResponse<Sample>>(url, this.headers)
  }

  readAll () {
    return this.http.get<ApiDefaultResponse<Sample[]>>(this.path, this.headers)
  }

  update (data: Sample) {
    const url = `${this.path}/${data.id}`
    return this.http.put(url, data)
  }

  delete (id: string) {
    const url = `${this.path}/${id}`
    return this.http.delete(url)
  }
}
