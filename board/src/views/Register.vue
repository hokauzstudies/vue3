<template>
  <div class="pg">
    <div class="row h-100 m-0">
      <div class="col-sm-12 col-md-6">
        <h1 class="mt-3">Crie sua conta</h1>

        <div class="mt-3">
          <div class="form-group">
            <label for="" class="form-control-label">Nome</label>
            <input type="email" placeholder="John Snow" class="form-control">
          </div>

          <div class="form-group">
            <label for="" class="form-control-label">Email</label>
            <input type="email" placeholder="name@email.com" class="form-control">
          </div>

          <div class="form-group m-0">
            <label for="" class="form-control-label">Senha</label>
            <input type="password" placeholder="Senha" class="form-control">
          </div>

          <div class="error mt-2 mb-2">
            <p class="small" v-if="hasError">Email já está em uso!</p>
          </div>

          <button class="btn btn-primary btn-block mt-5 p-0" @click="create">Criar conta</button>
          <router-link to="/" class="btn btn-link btn-sm btn-block">Voltar</router-link>

        </div>
      </div>
      <div class="d-none d-md-flex col-md-6 p-0">
        <div class="block">teste</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue } from 'vue-class-component'
import { AuthProvider } from '@/core/providers'

export default class Register extends Vue {
  hasError = false;

  create () {
    AuthProvider.create()
    this.hasError = true
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/main';

.pg {
  height: 100%;
}

.error {
  height: 20px;
  p {
    // color: $danger;
  }
}

.block {
  width: 100%;
  // background: $primary;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
