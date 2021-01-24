<template>
  <div>
    <h1>Client</h1>
    <button @click="toggleForm" v-if="!formIsShowing">Adicionar</button>

    <div v-if="formIsShowing">
      <form>
        <input type="text" placeholder="Nome" v-model="name" required>
        <p v-if="nameError">{{ nameError }}</p>
        <input type="text" placeholder="Email" v-model="email" required>
        <p v-if="emailError">{{ emailError }}</p>
        <input type="text" placeholder="Documento (CPF ou CNPJ)" v-model="doc" v-mask="'cpf | cnpj'" required @keyup.enter="validate">
        <p v-if="docError">{{ docError }}</p>
      </form>

      <button @click="toggleForm">Cancelar</button>
      <button @click="validate">Adicionar</button>
      <p v-if="formLoad">Criando...</p>
      <p v-if="formError">{{ formError }}</p>
    </div>
  </div>

  <div v-if="clients">
    <div v-if="!clientsError">
      <p v-for="client in clients" :key="client.name" @click="goTo(client.uid)"> {{ client.name }}</p>
    </div>
    <div v-else>
      <p>{{ clientsError }}</p>
    </div>
  </div>
  <div v-if="clientsLoad">Carregando clientes...</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import { Nav, Routes } from '@/router'
import { Entity, ClientService } from '@/core'

import { Valitador } from '@/pkg/validator'

import { mask } from '@/directives/mask'

@Options({
  directives: { mask: mask }
})
export default class ClientPage extends Vue {
  formIsShowing = false
  formLoad = false
  formError: string | undefined = ''

  name = 'teste1'
  nameError = ''
  email = 'teste@gmail.com'
  emailError = ''
  doc = '014.007.275-61'
  docError = ''

  clients: Entity.Client[] = []
  clientsError: string | undefined = ''
  clientsLoad = false

  mounted () {
    this.readAll()
  }

  toggleForm () {
    this.formIsShowing = !this.formIsShowing
  }

  private checkName (): boolean {
    if (!this.name) {
      this.nameError = 'Dê um nome ao seu cliente'
      return false
    }

    this.nameError = ''
    return true
  }

  private checkEmail (): boolean {
    if (!this.email) {
      this.emailError = 'Email é necessário'
      return false
    }

    if (!Valitador.email(this.email)) {
      this.emailError = 'Digite um email válido'
      return false
    }

    this.emailError = ''
    return true
  }

  private checkDoc (): boolean {
    if (!this.doc) {
      this.docError = 'Documento necessário'
      return false
    }

    if (this.doc.length < 14) {
      this.docError = 'Documento inválido'
      return false
    }

    if (this.doc.length === 14 && !Valitador.CPF(this.doc)) {
      this.docError = 'CPF inválido'
      return false
    }

    if (this.doc.length > 14) {
      this.docError = 'Documento inválido'
      return false
    }

    if (this.doc.length === 18 && !Valitador.CNPJ(this.doc)) {
      this.docError = 'CNPJ inválido'
      return false
    }

    this.docError = ''
    return true
  }

  validate () {
    let isValid = false
    isValid = this.checkName()
    isValid = this.checkEmail()
    isValid = this.checkDoc()

    if (!isValid) {
      return
    }

    this.add()
  }

  async add () {
    this.formLoad = true
    this.formError = ''

    const docType = this.doc.length === 14 ? 'CPF' : 'CNPJ'
    const client = new Entity.Client(this.name, this.email, this.doc, docType, '')
    const res = await ClientService.create(client)

    this.formLoad = false

    if (res.error) {
      this.formError = res.message
      return
    }

    this.formIsShowing = false
    this.readAll()
  }

  async readAll () {
    this.clientsError = ''
    this.clientsLoad = true
    const res = await ClientService.readAll()
    this.clientsLoad = false
    if (res.error) {
      this.clientsError = res.message
      return
    }

    this.clients = res.data as Entity.Client[]
  }

  goTo (id: string) {
    Nav.push(Routes.CLIENT_DETAIL, id)
  }
}

</script>

<style scoped lang="scss">

</style>
