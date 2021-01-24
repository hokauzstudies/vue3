<template>
    <div>
      <div class="form-group">
        <label for="" class="form-control-label">Texto</label>
        <input type="text" class="form-control" v-model="obj.text">
      </div>

      <button class="btn btn-primary" @click="create">Salvar</button>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { SampleProvider } from '../../core/providers'
import { Sample } from '../../core/entity/sample'

export default class SampleCreate extends Vue {
  obj = new Sample('')

  create () {
    return SampleProvider.create(this.obj)
      .then(console.log)
      .catch(console.log)
  }
}
</script>

<style scoped>

</style>
