<template>
  <div id="LoginFrame">
    <SnowfallBackdrop>
      <Icon class="icon-logo" href="icon-logo" size="70rem" @click="router.replace('/')" />
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
import { signIn } from "@/server/api/auth"
import { getFirstMenu } from "@/tools/permission"
import { ElMessage } from "element-plus"

const router = useRouter()
const loading = ref(false)
const form = reactive({
  username: localStorage.getItem("username") ?? "",
  password: "",
})

async function login() {
  try {
    loading.value = true
    const res = await signIn(form)

    user.setToken(res.data.token)
    user.setUser(res.data.user)
    user.setPermission(res.data.permissions)

    const { path } = getFirstMenu()
    if (path) router.replace(path)
    else ElMessage.error("该账户未设置访问权限")
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
    top: calc($space - 10rem);
    left: $space;
    color: #fff;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: $primary-color;
    }
  }

  .login-container {
    width: 350rem;
    box-sizing: border-box;
    padding: 25rem 35rem;
    border-radius: 40rem;
    background-color: aliceblue;
    border: 5rem solid #fff;
    box-shadow: rgba(69, 214, 187, 0.2) 0rem 30rem 30rem -20rem;

    .title {
      text-align: center;
      font-size: 32rem;
      color: rgba(69, 214, 187, 0.5);
      font-weight: 700;
      user-select: none;
      letter-spacing: 0.5em;
      text-indent: 0.5em;
      @include flex-center;
    }

    .form {
      margin: 20rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      input {
        caret-color: rgba(69, 214, 187, 0.5);
        width: 100%;
        padding: 15rem 20rem;
        box-sizing: border-box;
        border: 0;
        outline: none;
        box-shadow: rgba(69, 214, 187, 0.2) 0rem 10rem 10rem -5rem;
        border-inline: 2rem solid transparent;
        margin-top: 20rem;
        background-color: #fff;
        border-radius: 20rem;
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
            box-shadow: var(--login-color-primary-5) 0rem 23rem 10rem -20rem;
          }
        }
      }
    }
    .action {
      width: 100%;
      margin-bottom: 20rem;
      height: 45rem;
      line-height: 45rem;
      color: #fff;
      user-select: none;
      font-weight: 700;
      text-align: center;
      cursor: pointer;
      border-radius: 20rem;
      border: 0;
      background: linear-gradient(
        to right,
        rgba(69, 214, 187, 0.3),
        rgba(#a6c1ee, 0.7),
        rgba(69, 214, 187, 0.3)
      );
      background-size: 200%;
      box-shadow: var(--login-color-primary-5) 0rem 23rem 10rem -20rem;
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
  @media screen and (max-width: 400rem) {
    .frame {
      width: 90%;
      padding: 40rem 20rem;
    }
  }
}
</style>
