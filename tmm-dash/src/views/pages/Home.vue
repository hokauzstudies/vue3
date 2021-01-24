<template>
  <div>
    <h1>Home</h1>
    <div>
      <label for="">Import</label>
      <input type="file" class="my_input" @change="importExcel" id="upload" v-bind="value" />Import
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
</template>

<script lang="ts">
/**
  TODO
  - Selecionar headers visiveis para o cliente
  - Adicionar data de upload
  - Escolher cliente
  - Escolher campanha
  - Exibir uploads por bloco
 */
import {
  Options,
  Vue
} from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { Reader, RowKey } from './../../pkg/reader'

interface Fills extends RowKey {
  selected: boolean;
}

@Options({
  components: {
    HelloWorld
  }
})
export default class HomePage extends Vue {
  reader = new Reader()
  value = ''
  keys: RowKey[] = []
  rows: object[] = []

  // fils:
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

  upload () {
    console.log('')
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
