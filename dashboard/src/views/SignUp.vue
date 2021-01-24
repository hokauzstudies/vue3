<template>
  <div class="row">
    <div class="col col-5 one">
      <div class="content">
        <div class="box-inline j-between">
          <img src="../assets/logo.svg" alt="">
          <button class="btn btn-outline">Sign in</button>
        </div>

        <div>
          <span class="subtitle">Start for free</span>
          <h1 class="mb-16">Create an Account</h1>

          <input type="email" placeholder="Enter your email" class="mb-8" :disabled="isDisabled">
          <input type="password" placeholder="Enter your password" class="mb-16" :disabled="isDisabled">

          <button class="btn btn-lg btn-full mt-16 mb-16 ripple btnH" :disabled="isDisabled" @click="signup">Sign up</button>

          <p class="mt-32">Already have an Account? <a class="txt-primary">Sign in</a></p>
        </div>

        <div class="footer">
          <p><a href="#" class="link">Privacy Policy</a> and <a href="#" class="link">Terms of Service</a></p>
        </div>
      </div>
    </div>
    <div class="col col-7 bg">
      <img src="../assets/images/undraw1.svg" alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class SignUp extends Vue {
  isDisabled = false

  signup () {
    this.isDisabled = true

    setTimeout(() => {
      this.isDisabled = false
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
$primary: #4035bf;
$light-contrast: #e6dff8;
$grey-0: #f7f6f8;
$grey-1: #aca5dd;
$grey-2: #857bb9;
$grey-3: #3e3b61;
$dark: #09071a;

.btnH {
  background: linear-gradient(to right, $primary, $grey-3);
  background-repeat: no-repeat;
  background-size: 0 100%;
  transition: background-size 500ms 0s;
}

.btnH:focus:hover {
  background-size: 100% 100%;
}

.one {
  justify-content: center;
}

.col {
  display: flex;
  height: 100%;

  &.col-5 {
    width: calc(100% - (calc(7/12) * 100%));
  }
  &.col-6 {
    width: calc(100% - (calc(6/12) * 100%));
  }
  &.col-7 {
    width: calc(100% - (calc(5/12) * 100%));
  }
}

.bg {
  background-color: $primary;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 70%;
  }
}

.row {
  display: flex;
  height: 100%;
}

.content {
  width: 400px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 50px;
}

button, input, textarea {
  outline: none;
  box-sizing: border-box;
}

button {
  cursor: pointer;

  &:disabled {
    background-color: $grey-2;
  }
}

h1, h2, h3, h4, h5, h6, p {
  margin: 0;
  padding: 0;
}

p {
  font-family: JosefinMedium;
  color: #b5b5ba;

  a {
    color: $primary;
  }
}

.link {
  color: $grey-2;
  text-decoration: underline;
}

.mt-16 {
  margin-top: 16px;
}

.mt-32 {
  margin-top: 32px;
}

.mb-8  {
  margin-bottom: 8px;
}

.mb-16  {
  margin-bottom: 16px;
}

input {
  color: $dark;
  border: 2px solid $grey-0;
  padding: 12px;
  border-radius: 6px;
  width: 100%;
  font-size: 16px;
  font-family: Josefin;
  height: 50px;

  &:disabled {
    background-color: $grey-0;
    color: $grey-1;
  }

  &::placeholder {
    color: #cfcfd7;
  }
}

.subtitle {
  text-transform: uppercase;
  color: #b5b5ba;
  font-family: JosefinBold;
  font-size: 14px;
}

.title {
  color: $dark;
  font-family: JosefinBold;
  font-size: 40px;
}

.box-inline {
  display: flex;
  align-items: center;
}

.box {
  display: flex;
  flex-direction: column;
}

.j-between {
  justify-content: space-between;
}

button {
  border: 0;
  background: transparent;
}

.btn {
  height: 40px;
  color: $light-contrast;
  padding: 10px 40px;
  background-color: $primary;
  border-radius: 6px;
  font-weight: bold;

  &-outline {
    border: 2px solid $primary;
    color: $primary;
    background-color: transparent;
  }

  &-full {
    width: 100%;
  }

  &-lg {
    height: 50px;
    font-size: 16px;
    font-family: Josefin;
  }
}

img {
  width: 60px;
}

</style>
