<template>
  <div>
    <div v-if="client">
      <h1>{{ client.name }}</h1>
      <p>{{ client.email }}</p>

      <div>
        <label for="">Adicionar relatório</label>
        <input type="file" class="my_input" @change="importExcel" id="upload" v-bind="value" placeholder="Adicionar relatório" />
      </div>

      <div v-if="keys.length && rows.length">
        <div class="table">
          <div class="headers">
            <span v-for="item in keys" :key="item._local_id">{{ item.name }}</span>
          </div>
          <div class="row" v-for="item in rows" :key="item._local_id">
            <span  v-for="cell in proccessItem(item)" :key="cell[0]">{{ cell[1] }}</span>
          </div>
        </div>

        <button @click="upload">Gravar</button>
      </div>
    </div>

    <p v-if="clientError">{{clientError}}</p>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

import { Nav } from '@/router'

import { Entity, ClientService } from '@/core'

import { Reader, RowKey } from '@/pkg/reader'

export default class ClientDetailPage extends Vue {
  client?: Entity.Client | null = null
  clientError? = ''

  reader = new Reader()
  value = ''
  keys: RowKey[] = []
  rows: object[] = []

  mounted () {
    const id = this.$route.params.id as string
    if (!id) Nav.pop()
    this.read(id)
  }

  async read (id: string) {
    const res = await ClientService.read(id)
    if (res.error) {
      this.clientError = res.message
      return
    }
    this.client = res.data
  }

  async importExcel (event: Event) {
    const list = await this.reader.XLSX(event)

    if (list) {
      this.keys = list.keys
      this.rows = list.rows
    }
    this.value = ''
  }

  proccessItem (item: object) {
    return Object.entries(item)
  }
}
</script>

<style lang="scss" scoped>
  .w-100 {
    width: 100%;
  }

  .table {
    width: calc(100vw - 290px);
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  .headers, .row {
    display: flex;
    min-width: min-content;
    // flex-direction: column;
    overflow-x: scroll;

    span {
      font-weight: bold;
      width: 200px;
    }
  }
</style>
