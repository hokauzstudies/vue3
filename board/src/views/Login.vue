<template>
  <div class="box-inline">
    <img src="../assets/logo.svg" alt="" class="logo">
    <button class="btn btn-outline">Login</button>
  </div>

  <div>
    <span>Start for free</span>
    <h1>Login in your account</h1>

    <input type="email" placeholder="Enter your email">
    <input type="password" placeholer="Enter your password">
    <button>Sign in</button>

    <p>Already not have on account? <a href="#">Sign up</a></p>
  </div>
</template>

<script>
import { Vue } from 'vue-class-component'
import { AuthProvider } from '@/core/providers'

export default class Login extends Vue {
  hasError = false;
  isDisabled = false;

  login () {
    this.isDisabled = true
    setTimeout(() => {
      AuthProvider.login()
      this.hasError = true
      this.isDisabled = false
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/main';
$color:#4000B6;
.logo {
  width: 60px;
}

.btn {
  padding: 5px 50px;

  &-outline {
    color: $color;
    border: 2px solid $color;
  }
}

.box-inline {
  display: flex;
  justify-content: space-between;
}

.box {
  width: 40%;
  border: .5px solid #ccc;
  padding: 32px;
}

.centered-h {
  justify-content: center;
}

.centered-v {
  align-items: center;
}

.centered-a {
  @extend .centered-h;
  @extend .centered-v;
}

.on-center {
  align-self: center;
  margin: 0 auto;
}

.pg {
  width: 100%;
  height: 100%;
  display: flex;
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
