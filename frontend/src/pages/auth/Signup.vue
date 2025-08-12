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
import usFlag from '@images/auth/us-flag-icon.svg'


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

import { VueTelInput } from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'



definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
  businessName: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  remember: false,
})

const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const authStore = useAuthStore()
const router = useRouter()
const loginError = ref('')
const phone = ref(null)

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
        <div class="auth-form-wrapper no-flex">
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
                Sign up with Chatbookly to grow your business.
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
                    Signup with Google
                  </a>
                </li>
              </ul>
              <div class="or-divider mtb-16">
                <span>OR</span>
              </div>
              <VForm
                class="form"
                @submit.prevent=""
              >
                <VRow>
                  <VCol cols="12">
                    <div class="form-group">
                      <div class="input-container">
                        <AppTextField
                          v-model="form.businessName"
                          autofocus
                          label="Business Name<sup>*</sup>"
                          type="text"
                          placeholder="e:g: Marco Barbarshop"
                        />
                      </div>
                    </div>
                  </VCol>
                  <VCol cols="6">
                    <div class="form-group">
                      <div class="input-container">
                        <AppTextField
                          v-model="form.firstName"
                          autofocus
                          label="First Name<sup>*</sup>"
                          type="text"
                          placeholder="Jhon"
                        />
                      </div>
                    </div>
                  </VCol>
                  <VCol cols="6">
                    <div class="form-group">
                      <div class="input-container">
                        <AppTextField
                          v-model="form.lastName"
                          autofocus
                          label="Last Name<sup>*</sup>"
                          type="text"
                          placeholder="Smith"
                        />
                      </div>
                    </div>
                  </VCol>
                  <VCol cols="12">
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
                  </VCol>
                  <VCol cols="12">
                    <div class="form-group">
                      <div class="input-container country-phone">
                        <label for="phone-number">Phone Number <span>(Optional)</span></label>
                        <VueTelInput
                          id="phone-number"
                          v-model="phone"
                          mode="international"
                          :inputOptions="{ placeholder: '(555) 000-0000' }"
                        />
                      </div>
                    </div>
                  </VCol>
                  <VCol cols="6">
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
                  </VCol>
                  <VCol cols="6">
                    <div class="form-group">
                      <div class="input-container password-container">
                        <div class="icon">
                          <img
                            :src="lockGrayIcon"
                            alt="icon"
                          >
                        </div>
                        <AppTextField
                          v-model="form.confirmPassword"
                          label="Confirm Password<sup>*</sup>"
                          placeholder="• • • • • • • • • • "
                          :type="isConfirmPasswordVisible ? 'text' : 'password'"
                          autocomplete="password"
                          :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                          @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                        />
                      </div>
                    </div>
                  </VCol>

                  <VCol cols="12">
                    <div class="form-group submit mt-12">
                      <VBtn
                        block
                        type="submit"
                      >
                        Signup
                      </VBtn>
                    </div>
                  </VCol>
                </VRow>
              </VForm>
              <div class="no-account">
                <p>Already have an account?</p>
                <RouterLink
                  to="/login"
                  class="tag-btn"
                >
                  Login
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
