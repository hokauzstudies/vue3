import { Storage } from '@/pkg/storage'

interface UsecaseAuthContract {
  isLogged (): Promise<boolean> | boolean;
  login (): Promise<null> | null;
  logout (): Promise<null> | null;
}

export class UsecaseAuth implements UsecaseAuthContract {
  isLogged () {
    return !!Storage.read('use')
  }

  login () {
    return null
  }

  logout () {
    return null
  }

  create () {
    return null
  }

  delete () {
    return null
  }
}
