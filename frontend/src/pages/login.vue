<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import { useAuthStore } from '@core/stores/auth'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'

// Import Images
import logoDark from '@images/logo-dark.png'


// Import icons
import googleColorIcon from '@images/auth/google-color-icon.svg?url'
import emailGrayIcon from '@images/auth/email-gray-icon.svg?url'
import lockGrayIcon from '@images/auth/lock-gray-icon.svg?url'
import authImg from '@images/auth/auth-img.png'
import globeGrayIcon from '@images/auth/globe-gray-icon.svg?url'
import userGrayIcon from '@images/auth/user-gray-icon.svg?url'

import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { useRouter } from 'vue-router'

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const isPasswordVisible = ref(false)
const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const authStore = useAuthStore()
const router = useRouter()
const loginError = ref('')

function handleLogin() {
  loginError.value = ''

  const { success, role } = authStore.login(form.value.email, form.value.password)
  if (success) {
    if (role === 'admin') {
      router.push('/admin')
    } else if (role === 'business') {
      router.push('/business')
    }
  } else {
    loginError.value = 'Invalid credentials'
  }
}
</script>

<template>
  <section class="sec-auth-wrapper">
    <VContainer fluid>
      <div class="auth-grid">
        <div class="auth-form-wrapper">
          <div class="auth-header">
            <a
              href="#"
              class="logo"
            >
              <img
                :src="logoDark"
                alt="logo"
              >
            </a>
          </div>
          <div class="auth-form">
            <div class="user-wrapper">
              <div class="user-icon">
                <img
                  :src="userGrayIcon"
                  alt="img"
                >
              </div>
            </div>
            <div class="about-company">
              <h3>Welcome to Chatbookly! 👋🏻</h3>
              <p class="f-16">
                Please sign-in to your account and start the <br> adventure
              </p>
            </div>
            <div class="form-wrapper">
              <ul class="social-login">
                <li>
                  <a
                    href="#"
                    class="social-btn"
                  >
                    <span class="icon">
                      <img
                        :src="googleColorIcon"
                        alt="icon"
                      >
                    </span>
                    Login with Google
                  </a>
                </li>
              </ul>
              <div class="or-divider">
                <span>OR</span>
              </div>
              <VForm
                class="form"
                @submit.prevent="handleLogin"
              >
                <div class="form-group">
                  <div class="input-container has-icon">
                    <div class="icon">
                      <img
                        :src="emailGrayIcon"
                        alt="icon"
                      >
                    </div>
                    <AppTextField
                      v-model="form.email"
                      autofocus
                      label="Email Address<sup>*</sup>"
                      type="email"
                      placeholder="hello@example.com"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-container password-container">
                    <div class="icon">
                      <img
                        :src="lockGrayIcon"
                        alt="icon"
                      >
                    </div>
                    <AppTextField
                      v-model="form.password"
                      label="Password<sup>*</sup>"
                      placeholder="• • • • • • • • • • "
                      :type="isPasswordVisible ? 'text' : 'password'"
                      autocomplete="password"
                      :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                  </div>
                </div>
                <div class="form-group forgot-group">
                  <div class="remember-wrapper">
                    <VCheckbox
                      v-model="form.remember"
                      label="Remember me"
                    />
                  </div>
                  <div class="forgot-wrapper">
                    <a href="#">Forgot password?</a>
                  </div>
                </div>
                <div class="form-group submit">
                  <VBtn
                    block
                    type="submit"
                  >
                    Login
                  </VBtn>
                </div>
              </VForm>
              <div class="no-account">
                <p>Don't have an account?</p>
                <RouterLink
                  to="/signup"
                  class="tag-btn"
                >
                  Register
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="auth-footer">
            <p>© 2025 Chatbookly</p>
            <div class="select-language">
              <div class="icon">
                <img
                  :src="globeGrayIcon"
                  alt="icon"
                >
              </div>
              <select>
                <option value="eng">
                  ENG
                </option>
                <option value="eng">
                  ENG
                </option>
                <option value="eng">
                  ENG
                </option>
                <option value="eng">
                  ENG
                </option>
                <option value="eng">
                  ENG
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="auth-graphic">
          <img
            :src="authImg"
            alt="img"
          >
        </div>
      </div>
    </VContainer>
  </section>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";

</style>
