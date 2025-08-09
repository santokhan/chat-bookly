import { useConnectStore } from '../stores/connect'
import { useRouter } from 'vue-router'

export const useConnect = () => {
  const store = useConnectStore()
  const router = useRouter()

  // Business Selection Methods
  const selectCategory = (category: string) => {
    store.setBusinessCategory(category)
    store.closeDropdowns()
  }

  const selectType = (type: string) => {
    store.addBusinessType(type)
    // Don't close dropdown for multi-select
  }

  const removeType = (type: string) => {
    store.removeBusinessType(type)
  }

  // Navigation Methods
  const saveAndConnect = async () => {
    const success = await store.saveBusiness()
    if (success) {
      // Successfully saved and moved to step 2
      return true
    }
    return false
  }

  const connectWhatsApp = async () => {
    const success = await store.initiateWhatsAppConnection()
    if (success) {
      // Start polling for connection status
      startConnectionStatusPolling()
    }
    return success
  }

  const goBackToStep1 = () => {
    store.setCurrentStep(1)
  }

  const handleDialogClose = () => {
    store.setShowSuccessDialog(false)
    store.setCurrentStep(1)
  }

  const handleGoToDashboard = () => {
    router.push('/whatsapp-analytics')
    store.setShowSuccessDialog(false)
  }

  // Connection Status Polling
  let statusPollingInterval: number | null = null

  const startConnectionStatusPolling = () => {
    if (statusPollingInterval) {
      clearInterval(statusPollingInterval)
    }

    statusPollingInterval = setInterval(async () => {
      const status = await store.checkConnectionStatus()

      if (status?.connectionStatus === 'connected') {
        stopConnectionStatusPolling()
      }
    }, 3000) // Poll every 3 seconds
  }

  const stopConnectionStatusPolling = () => {
    if (statusPollingInterval) {
      clearInterval(statusPollingInterval)
      statusPollingInterval = null
    }
  }

  // Event Handlers
  const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement

    // Check if click is outside categories dropdown
    const categoriesDropdown = target.closest('[data-dropdown="categories"]')
    if (!categoriesDropdown && store.isCategoriesDropdownOpen) {
      store.isCategoriesDropdownOpen = false
    }

    // Check if click is outside type dropdown
    const typeDropdown = target.closest('[data-dropdown="type"]')
    if (!typeDropdown && store.isTypeDropdownOpen) {
      store.isTypeDropdownOpen = false
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      store.closeDropdowns()
    }
  }

  // Utility Methods
  const getTypesForCategory = (category: string): string[] => {
    return store.businessTypes[category] || []
  }

  const getAvailableTypes = (): string[] => {
    return store.availableTypes
  }

  // Cleanup
  const cleanup = () => {
    stopConnectionStatusPolling()
  }

  return {
    // Store state and computed
    ...store,

    // Methods
    selectCategory,
    selectType,
    removeType,
    saveAndConnect,
    connectWhatsApp,
    goBackToStep1,
    handleDialogClose,
    handleGoToDashboard,
    startConnectionStatusPolling,
    stopConnectionStatusPolling,
    handleClickOutside,
    handleKeyDown,
    getTypesForCategory,
    getAvailableTypes,
    cleanup,
  }
}
