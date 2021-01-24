<template>
  <main>
    <div class="nav">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/client">Clients</router-link>
      </nav>

      <div>
        <button @click="logout">Logout</button>
      </div>
    </div>
    <section>
      <router-view></router-view>
    </section>
  </main>
</template>

<script>
import { Vue } from 'vue-class-component'
import { Nav, Routes } from '../../router'
import { AuthUsecase } from '../../core/usecase/auth/auth.usecase'

export default class Dash extends Vue {
  // TODO: change to provider
  auth = new AuthUsecase()

  async logout () {
    await this.auth.logout()
    Nav.root(Routes.SIGN_IN)
  }
}
</script>

<style scoped lang="scss">
  main {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .nav {
    width: 250px;
    height: 100%;
    background: #ccc;
    padding: 20px;

    nav {
      display: flex;
      flex-direction: column;
    }
  }

  section {
    padding: 20px;
  }
</style>
