import { Router } from 'vue-router'
import { RouteRef } from './routes'

export class Navigation {
  router?: Router

  push (route: RouteRef, id?: string | number) {
    const path = id ? route.path.replace(':id', id.toString()) : route.path
    if (this.router) {
      this.router.push(path)
    }
  }

  pop () {
    if (this.router) {
      window.history.length > 1
        ? this.router.go(-1)
        : this.router.push('/')
    }
  }

  root (route?: RouteRef) {
    if (this.router) {
      this.router.replace(route?.path || '/')
    }
  }
}
