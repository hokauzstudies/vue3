<template>
    <div class="container">
        <div class="row stripped">
            <div class="col-4"><strong>Texto</strong></div>
            <div class="col-8"><strong>Ação</strong></div>
        </div>
        <div v-for="item of list" :key="item.id" class="row mb-1">
            <div class="col-4">{{item.text}}</div>
            <div class="col-8">
                <button class="btn btn-link" @click="edit">Editar</button>
                <button class="btn btn-outline-danger" @click="remove">Deletar</button>
            </div>
        </div>

      <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">Save changes</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { SampleProvider } from '../../core/providers'
import { Sample } from '../../core/entity/sample'

export default class SampleCreate extends Vue {
  list: Sample[] = []

  mounted () {
    this.readAll()
  }

  readAll () {
    return SampleProvider.readAll()
      .then((res) => (this.list = res.data))
      .catch(console.log)
  }

  edit () {
    return null
  }

  remove () {
    return null
  }
}
</script>

<style scoped>

</style>
