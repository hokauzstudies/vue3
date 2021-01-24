import { Campaign, Client } from '@/core/entity'
import { ClientService, CampaignService } from '@/core/'

export const mapClient: Client[] = [
  new Client(
    'Pandinha da silva',
    'padinha@coisamaislinda.com.br',
    '123.456.789-00',
    'CPF',
    'Ws8ioCCPpaWxkxa5X3NVugm6F383'
  ),
  new Client(
    'Theo da silva',
    'theo@pagaboleto.com.br',
    '123.456.789-01',
    'CPF',
    'OCkSytNjmAderq0yGCQpIN6Vpag1'
  )
]
export const mapCampaign: Campaign[] = [
  new Campaign('Nova roupinha sexy', '2020-11-03T00:28:40.798Z', 'Ws8ioCCPpaWxkxa5X3NVugm6F383', 'Pandinha da silva'),
  new Campaign('Especial de natal', '2020-11-03T00:28:40.798Z', 'Ws8ioCCPpaWxkxa5X3NVugm6F383', 'Pandinha da silva'),
  new Campaign('Ajude a pagar meu boleto', '2020-11-03T00:28:40.798Z', 'OCkSytNjmAderq0yGCQpIN6Vpag1', 'Theo da silva'),
  new Campaign('Meu osso novo', '2020-11-03T00:28:40.798Z', 'OCkSytNjmAderq0yGCQpIN6Vpag1', 'Theo da silva')
]

export function insert () {
  mapClient.forEach(async client => {
    await ClientService.create(client)
      .then(console.log)
  })

  mapCampaign.forEach(async camp => {
    await CampaignService.create(camp)
      .then(console.log)
  })
}
