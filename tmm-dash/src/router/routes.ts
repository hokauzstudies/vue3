// # Public
import SignInPage from '../views/pages/SignIn.vue'
import SignInAdminPage from '../views/pages/SignInAdmin.vue'
import RecoverPage from '../views/pages/Recover.vue'

// # Private
// -- Layouts
import Dash from '../views/layout/Dash.vue'
// -- Pages
import HomePage from '../views/pages/Home.vue'
import ClientPage from '../views/pages/Client.vue'
import ClientDetailPage from '../views/pages/ClientDetail.vue'

export class RouteRef {
  path: string
  name: string

  constructor (path: string, name: string) {
    this.path = path
    this.name = name
  }
}

export class RoutesNamesRef {
  static DASH = new RouteRef('/', 'Dash')
  static HOME = new RouteRef('/home', 'Home')
  static CLIENT = new RouteRef('/client', 'Clientes')
  static CLIENT_DETAIL = new RouteRef('/client/:id', 'Clientes 2')
  static RECOVER = new RouteRef('/recover', 'Recuperar senha')
  static SIGN_IN = new RouteRef('/signin', 'Sign In')
  static SIGN_IN_INSIDE = new RouteRef('/admin', 'Admin')
}

export const RouteMap = {
  DASH: {
    path: RoutesNamesRef.DASH.path,
    name: RoutesNamesRef.DASH.name,
    component: Dash,
    redirect: RoutesNamesRef.HOME.path,
    children: [
      {
        path: RoutesNamesRef.HOME.path,
        name: RoutesNamesRef.HOME.name,
        component: HomePage
      },
      {
        path: RoutesNamesRef.CLIENT.path,
        name: RoutesNamesRef.CLIENT.name,
        component: ClientPage
      },
      {
        path: RoutesNamesRef.CLIENT_DETAIL.path,
        name: RoutesNamesRef.CLIENT_DETAIL.name,
        component: ClientDetailPage
      }
    ]
  },
  SIGN_IN: {
    path: RoutesNamesRef.SIGN_IN.path,
    name: RoutesNamesRef.SIGN_IN.path,
    component: SignInPage
  },
  SIGN_IN_INSIDE: {
    path: RoutesNamesRef.SIGN_IN_INSIDE.path,
    name: RoutesNamesRef.SIGN_IN_INSIDE.name,
    component: SignInAdminPage
  },
  RECOVER: {
    path: RoutesNamesRef.RECOVER.path,
    name: RoutesNamesRef.RECOVER.name,
    component: RecoverPage
  }
}
