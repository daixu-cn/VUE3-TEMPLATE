<template>
  <div id="LoginFrame">
    <SnowfallBackdrop>
      <Icon class="icon-logo" href="icon-logo" size="70px" @click="router.replace('/')" />
      <div class="login-container">
        <h1 class="title">登录</h1>
        <div class="form">
          <input v-model="form.username" type="text" placeholder="邮箱" />
          <input v-model="form.password" type="password" placeholder="密码" @keyup.enter="login" />
        </div>
        <button class="action" :loading="loading" @click="login">登录</button>
      </div>
    </SnowfallBackdrop>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import SnowfallBackdrop from "@/components/SnowfallBackdrop.vue"
import { Icon } from "vue-iconify"
import { useRouter } from "vue-router"
import { user } from "@/store"
import http from "@/server"
import type { LoginModel } from "@/server/models/Auth/LoginModel"

const router = useRouter()
const loading = ref(false)
const form = reactive({
  username: localStorage.getItem("username") ?? "",
  password: "",
})

async function login() {
  try {
    loading.value = true
    const res = await http.post<LoginModel>("/login.json", form)

    user.setToken(res.data!.token)
    user.setUser(res.data!.user)
    user.setPermission(res.data!.permissions)
    router.replace("/")
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss">
#LoginFrame {
  width: 100vw;
  height: 100vh;
  background: rgb(232 232 232 / 20%);
  @include flex-center;

  .icon-logo {
    position: absolute;
    top: calc($space - 10px);
    left: $space;
    color: #fff;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: $primary-color;
    }
  }

  .login-container {
    width: 350px;
    box-sizing: border-box;
    padding: 25px 35px;
    border-radius: 40px;
    background-color: aliceblue;
    border: 5px solid #fff;
    box-shadow: rgba(69, 214, 187, 0.2) 0px 30px 30px -20px;

    .title {
      text-align: center;
      font-size: 32px;
      color: rgba(69, 214, 187, 0.5);
      font-weight: 700;
      user-select: none;
      letter-spacing: 0.5em;
      text-indent: 0.5em;
      @include flex-center;
    }

    .form {
      margin: 20px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      input {
        caret-color: rgba(69, 214, 187, 0.5);
        width: 100%;
        padding: 15px 20px;
        box-sizing: border-box;
        border: 0;
        outline: none;
        box-shadow: rgba(69, 214, 187, 0.2) 0px 10px 10px -5px;
        border-inline: 2px solid transparent;
        margin-top: 20px;
        background-color: #fff;
        border-radius: 20px;
        color: $font-secondary-color;
        &:first-child {
          margin-top: 0;
        }
        &::placeholder {
          font-weight: 700;
          color: #acb7c9;
        }
        &:focus {
          animation: input-animation 2s infinite;
        }
        &:-webkit-autofill {
          transition: background-color 50000s ease-in-out 0s;
          -webkit-text-fill-color: $font-secondary-color;
        }

        @keyframes input-animation {
          50% {
            box-shadow: var(--login-color-primary-5) 0px 23px 10px -20px;
          }
        }
      }
    }
    .action {
      width: 100%;
      margin-bottom: 20px;
      height: 45px;
      line-height: 45px;
      color: #fff;
      user-select: none;
      font-weight: 700;
      text-align: center;
      cursor: pointer;
      border-radius: 20px;
      border: 0;
      background: linear-gradient(
        to right,
        rgba(69, 214, 187, 0.3),
        rgba(#a6c1ee, 0.7),
        rgba(69, 214, 187, 0.3)
      );
      background-size: 200%;
      box-shadow: var(--login-color-primary-5) 0px 23px 10px -20px;
      animation: action-animation 3s infinite;

      &:active {
        border-color: transparent;
      }
      @keyframes action-animation {
        50% {
          background-position: 200%;
        }
      }
    }
  }
  @media screen and (max-width: 400px) {
    .frame {
      width: 90%;
      padding: 40px 20px;
    }
  }
}
</style>
