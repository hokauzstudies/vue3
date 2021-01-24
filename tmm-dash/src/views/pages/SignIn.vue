<template>
  <div>
    <input type="email" v-model="email" placeholder="email">
    <input type="password" v-model="pass" placeholder="password" v-on:keyup.enter="isValid">
    <button @click="recover">Esquici minha senha</button>
    <button @click="isValid">Entrar</button>
    <span v-if="load">Loading...</span>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Nav, Routes } from '@/router'
import { ClientService } from '@/core'

export default class SignIn extends Vue {
  email = 'thiagohonore@gmail.com';
  pass = '271190';
  error: string | undefined = '';
  load = false;

  isValid () {
    this.error = ''

    if (!this.email || !this.pass) {
      this.error = 'É necessário email e senha!'
      return
    }

    if (this.pass.length < 6) {
      this.error = 'Senha precisa mair que 6 caracters'
      return
    }

    this.signin()
  }

  async signin () {
    this.load = true
    const res = await ClientService.login(this.email, this.pass)
    this.load = false

    if (res.error) {
      this.error = res.message
      return
    }

    this.load = false
    Nav.push(Routes.HOME)
  }

  recover () {
    Nav.push(Routes.RECOVER)
  }
}
</script>

<style>

</style>
