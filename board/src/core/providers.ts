import { UsecaseAuth } from './auth/auth.usecase'
import { UsecaseSample } from './sample/sample.usecase'

const auth = new UsecaseAuth()
const sample = new UsecaseSample()

export {
  auth as AuthProvider,
  sample as SampleProvider
}
