import { Firestore, Query } from '@/pkg/firestore'
import { Response } from '@/pkg/response'

import { Campaign } from '@/core/entity'

export class CampaignUsecase {
  coll: string

  constructor (collName: string) {
    this.coll = collName
  }

  async create (camp: Campaign): Promise<Response<Campaign | undefined>> {
    return Firestore.createIn<Campaign>(this.coll, camp, '[CAMPAIGN CREATE]', 'Campanha criada com sucesso!', 'Algo inesperado aconteceu')
  }

  async read (id: string): Promise<Response<Campaign | undefined>> {
    const path = Firestore.makePath([this.coll, id])
    return Firestore.get<Campaign>(path, '[CAMPAIGN READ]', 'Campanha não encontrada!', 'Algo inesperado aconteceu!')
  }

  async readAll (): Promise<Response<Campaign[] | undefined>> {
    return Firestore.getAll<Campaign>(this.coll, '[CAMPAIGN READALL]', 'Nenhuma campanha cadastrada até o momento!', 'Algo inesperado aconteceu!')
  }

  async update (data: Campaign) {
    const path = Firestore.makePath([this.coll, data.id as string])
    return Firestore.getAll<Campaign>(path, '[CAMPAIGN UPDATE]', 'Campanha atualizada!', 'Algo inesperado aconteceu!')
  }

  delete (id: string) {
    const path = Firestore.makePath([this.coll, id])
    return Firestore.getAll<Campaign>(path, '[CAMPAIGN DELETE]', 'Campanha deletada!', 'Algo inesperado aconteceu!')
  }

  async search (clientUID: string, name?: string) {
    const queries = []

    queries.push(new Query('cliendUID', '==', clientUID))
    if (name) {
      queries.push(new Query('name', '<=', name))
    }

    return Firestore.searchIn(this.coll, queries, '[SEARCH CAMPAIGN]', 'Nenhuma campanha encontrada', 'Algo inesperado aconteceu!')
  }
}
