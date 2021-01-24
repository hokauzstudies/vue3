import { AuthUsecase } from './usecase/auth/auth.usecase'

import { AdminUsecase } from './usecase/admin/admin.usecase'
import { ClientUsecase } from './usecase/client/client.usecase'
import { CampaignUsecase } from './usecase/campaign/campaign.usecase'

import * as Entity from './entity'

const adminCollName = 'admins'
const clientCollName = 'clients'
const campaignCollName = 'campaigns'
const auth = new AuthUsecase()

const admin = new AdminUsecase(adminCollName)
const client = new ClientUsecase(clientCollName)
const campaign = new CampaignUsecase(campaignCollName)

export {
  auth as AuthService,
  admin as AdminService,
  client as ClientService,
  campaign as CampaignService,

  Entity
}
