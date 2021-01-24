
import { RouteRecordRaw } from 'vue-router'

export class RouterMiddleware {
  routes: Array<RouteRecordRaw> = []
  public: string[] = []

  addRoute (route: RouteRecordRaw, isPublic: boolean) {
    this.routes.push(route)
    if (isPublic) { this.public.push(route.path) }
  }

  needAuthentication (path: string) {
    // TODO: verificar funcionamento
    return this.public.includes(path)
  }
}
