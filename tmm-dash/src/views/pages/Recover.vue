<template>
  <div>
    <input type="email" v-model="email" placeholder="email">
    <span v-if="load">Loading...</span>
    <p v-if="error">{{ error }}</p>
    <button @click="recover">Recuperar senha</button>
    <button @click="back">Voltar</button>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Nav, Routes } from '@/router'
import { ClientService } from '@/core'

export default class RecoverPage extends Vue {
  email = 'thiagohonore@gmail.com';
  error? = '';
  load = false;

  async recover () {
    this.error = ''
    if (!this.email) {
      this.error = 'É necessário email'
      return
    }

    this.load = true
    const res = await ClientService.recover(this.email)
    if (res.error) {
      this.error = res.message
      return
    }

    this.load = false
    Nav.push(Routes.HOME)
  }

  back () {
    Nav.pop()
  }
}
</script>

<style>

</style>
