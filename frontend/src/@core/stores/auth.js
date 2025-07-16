import { defineStore } from 'pinia'
import { ref } from 'vue'

const AUTH_KEY = 'auth_data'

function loadAuth() {
  const data = localStorage.getItem(AUTH_KEY)
  if (data) {
    try {
      return JSON.parse(data)
    } catch {
      return { user: null, isAuthenticated: false, role: null, token: null }
    }
  }
  return { user: null, isAuthenticated: false, role: null, token: null }
}

export const useAuthStore = defineStore('auth', () => {
  const state = loadAuth()
  const user = ref(state.user)
  const isAuthenticated = ref(state.isAuthenticated)
  const role = ref(state.role)
  const token = ref(state.token)

  function saveAuth() {
    localStorage.setItem(
      AUTH_KEY,
      JSON.stringify({ user: user.value, isAuthenticated: isAuthenticated.value, role: role.value, token: token.value })
    )
  }

  function login(email, password) {
    if (email === 'admin@abc.com' && password === 'admin') {
      user.value = { email, role: 'admin' }
      role.value = 'admin'
      isAuthenticated.value = true
      token.value = 'dummy-admin-token'
      saveAuth()
      return { success: true, role: 'admin' }
    } else if (email === 'business@abc.com' && password === 'business') {
      user.value = { email, role: 'business' }
      role.value = 'business'
      isAuthenticated.value = true
      token.value = 'dummy-business-token'
      saveAuth()
      return { success: true, role: 'business' }
    } else {
      return { success: false }
    }
  }

  function logout() {
    console.log('Logging out the user');
    user.value = null
    isAuthenticated.value = false
    role.value = null
    token.value = null

    console.log('Removing the auth data from the local storage');
    localStorage.removeItem(AUTH_KEY)
    // Note: Redirect to /login should be handled by the caller (e.g., component or router)
  }

  return { user, isAuthenticated, role, token, login, logout }
})
