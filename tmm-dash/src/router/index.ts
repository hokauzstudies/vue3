import { createRouter, createWebHistory } from 'vue-router'

import { AuthService } from '@/core'

import { RouterMiddleware } from './middleware'
import { Navigation } from './navigation'
import { RouteMap, RoutesNamesRef } from './routes'

const middleware = new RouterMiddleware()

middleware.addRoute(RouteMap.DASH, false)
middleware.addRoute(RouteMap.SIGN_IN, true)
middleware.addRoute(RouteMap.SIGN_IN_INSIDE, true)
middleware.addRoute(RouteMap.RECOVER, true)

const nav = new Navigation()

function canAccess (path: string): boolean {
  if (middleware.needAuthentication(path)) {
    return AuthService.isAdmin()
  }

  return true
}

function startRouter () {
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: middleware.routes
  })

  router.beforeEach((to, _, next) => {
    if (!canAccess(to.path)) next({ path: RoutesNamesRef.SIGN_IN.path })
    else next()
  })

  return router
}

export {
  RoutesNamesRef as Routes,
  nav as Nav,
  startRouter
}
