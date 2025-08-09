import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface BusinessData {
  category: string
  types: string[]
  businessName?: string
  description?: string
  phone?: string
  email?: string
}

export interface WhatsAppConnectionData {
  qrCode?: string
  connectionStatus: 'disconnected' | 'connecting' | 'connected'
  sessionId?: string
  phoneNumber?: string
}

export const useConnectStore = defineStore('connect', () => {
  // State
  const businessData = ref<BusinessData>({
    category: '',
    types: [],
  })

  const whatsappConnection = ref<WhatsAppConnectionData>({
    connectionStatus: 'disconnected',
  })

  const currentStep = ref(1)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // UI State
  const isCategoriesDropdownOpen = ref(false)
  const isTypeDropdownOpen = ref(false)
  const showSuccessDialog = ref(false)

  // Business Types Data
  const businessTypes: Record<string, string[]> = {
    'Beauty & Wellness': [
      'Beauty Salon',
      'Hair Salon',
      'Nail Salon',
      'Spa',
      'Massage Therapy',
      'Wellness Center',
      'Barbershop',
    ],
    'Take away Restaurants': [
      'Fast Food',
      'Pizza',
      'Chinese Cuisine',
      'Italian Cuisine',
      'Mexican Cuisine',
      'Burger Joint',
      'Coffee Shop',
    ],
    'B&Bs': ['Bed & Breakfast', 'Guest House', 'Boutique Hotel', 'Hostel', 'Vacation Rental'],
    Health: [
      'Clinic',
      'Dental Office',
      'Pharmacy',
      'Physical Therapy',
      'Mental Health',
      'Veterinary Clinic',
    ],
    Automotive: [
      'Auto Repair',
      'Car Wash',
      'Gas Station',
      'Car Dealership',
      'Tire Shop',
      'Auto Parts',
    ],
    'Pet Care': [
      'Pet Grooming',
      'Veterinary Clinic',
      'Pet Store',
      'Dog Training',
      'Pet Boarding',
      'Pet Photography',
    ],
    'Retail & Shopping': [
      'Clothing Store',
      'Electronics Store',
      'Grocery Store',
      'Gift Shop',
      'Bookstore',
      'Jewelry Store',
    ],
    Education: [
      'School',
      'Training Center',
      'Language School',
      'Music School',
      'Art School',
      'Tutoring',
    ],
    Technology: [
      'Software Development',
      'IT Support',
      'Web Design',
      'Computer Repair',
      'Digital Marketing',
    ],
    'Real Estate': [
      'Real Estate Agency',
      'Property Management',
      'Real Estate Investment',
      'Home Inspection',
    ],
    Entertainment: ['Event Planning', 'Photography', 'Music Venue', 'Theater', 'Gaming Center'],
    'Professional Services': [
      'Law Firm',
      'Accounting',
      'Consulting',
      'Financial Services',
      'Insurance Agency',
    ],
  }

  const categories = ref(Object.keys(businessTypes))

  // Computed
  const availableTypes = computed(() => {
    return businessTypes[businessData.value.category] || []
  })

  const canProceedToStep2 = computed(() => {
    return businessData.value.category && businessData.value.types.length > 0
  })

  const isConnected = computed(() => {
    return whatsappConnection.value.connectionStatus === 'connected'
  })

  // Actions - Business Data Management
  const setBusinessCategory = (category: string) => {
    businessData.value.category = category
    businessData.value.types = [] // Reset types when category changes
  }

  const addBusinessType = (type: string) => {
    if (!businessData.value.types.includes(type)) {
      businessData.value.types.push(type)
    }
  }

  const removeBusinessType = (type: string) => {
    businessData.value.types = businessData.value.types.filter((t) => t !== type)
  }

  const updateBusinessData = (data: Partial<BusinessData>) => {
    businessData.value = { ...businessData.value, ...data }
  }

  // Actions - UI State Management
  const toggleCategoriesDropdown = () => {
    isCategoriesDropdownOpen.value = !isCategoriesDropdownOpen.value
    if (isCategoriesDropdownOpen.value) {
      isTypeDropdownOpen.value = false
    }
  }

  const toggleTypeDropdown = () => {
    if (!businessData.value.category) return
    isTypeDropdownOpen.value = !isTypeDropdownOpen.value
    if (isTypeDropdownOpen.value) {
      isCategoriesDropdownOpen.value = false
    }
  }

  const closeDropdowns = () => {
    isCategoriesDropdownOpen.value = false
    isTypeDropdownOpen.value = false
  }

  const setCurrentStep = (step: number) => {
    currentStep.value = step
  }

  const setShowSuccessDialog = (show: boolean) => {
    showSuccessDialog.value = show
  }

  // Actions - API Functions with Mock Data Fallback
  const saveBusiness = async () => {
    if (!canProceedToStep2.value) {
      error.value = 'Please select category and business types'
      return false
    }

    isLoading.value = true
    error.value = null

    try {
      // Use mock data for now - Replace with actual API when ready
      console.log('💾 Saving Business Data (Mock):', {
        category: businessData.value.category,
        types: businessData.value.types,
        timestamp: new Date().toISOString(),
      })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful response
      const mockResult = {
        success: true,
        businessId: 'biz_' + Date.now(),
        category: businessData.value.category,
        types: businessData.value.types,
        createdAt: new Date().toISOString(),
        status: 'saved',
      }

      // Update business data with mock response
      updateBusinessData({
        ...businessData.value,
        businessName: `${businessData.value.category} Business`,
        description: `A ${businessData.value.category.toLowerCase()} business offering ${businessData.value.types.join(
          ', '
        )}`,
      })

      console.log('✅ Business Data Saved Successfully (Mock):', mockResult)
      setCurrentStep(2)
      return true

      // TODO: Uncomment when real API is ready
      // const response = await fetch('/api/business/save', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${your_token}`
      //   },
      //   body: JSON.stringify(businessData.value)
      // })
      //
      // if (!response.ok) {
      //   throw new Error('Failed to save business data')
      // }
      //
      // const result = await response.json()
      // if (result.data) {
      //   updateBusinessData(result.data)
      // }
      // setCurrentStep(2)
      // return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to save business data'
      console.error('❌ Error saving business data:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const initiateWhatsAppConnection = async () => {
    isLoading.value = true
    error.value = null
    whatsappConnection.value.connectionStatus = 'connecting'

    try {
      // Use mock data for now - Replace with actual API when ready
      console.log('📱 Initiating WhatsApp Connection (Mock):', {
        businessData: businessData.value,
        timestamp: new Date().toISOString(),
      })

      // Simulate API delay for connecting
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful connection response
      const mockSessionId = 'ws_session_' + Date.now()
      const mockResult = {
        success: true,
        sessionId: mockSessionId,
        qrCode: 'data:image/png;base64,mock-qr-code-data',
        connectionStatus: 'connecting',
        phoneNumber: null,
        businessId: 'biz_' + Date.now(),
      }

      whatsappConnection.value = {
        ...whatsappConnection.value,
        sessionId: mockResult.sessionId,
        qrCode: mockResult.qrCode,
        connectionStatus: 'connecting',
      }

      console.log('✅ WhatsApp Connection Initiated (Mock):', mockResult)

      // Simulate successful connection after delay
      setTimeout(() => {
        whatsappConnection.value = {
          ...whatsappConnection.value,
          connectionStatus: 'connected',
          phoneNumber: '+1 (555) 123-4567',
        }
        setShowSuccessDialog(true)
        console.log('🎉 WhatsApp Connected Successfully (Mock)')
      }, 3000)

      return true

      // TODO: Uncomment when real API is ready
      // const response = await fetch('/api/whatsapp/connect', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${your_token}`
      //   },
      //   body: JSON.stringify({
      //     businessData: businessData.value
      //   })
      // })
      //
      // if (!response.ok) {
      //   throw new Error('Failed to initiate WhatsApp connection')
      // }
      //
      // const result = await response.json()
      // whatsappConnection.value = {
      //   ...whatsappConnection.value,
      //   ...result.data
      // }
      // return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'WhatsApp connection failed'
      whatsappConnection.value.connectionStatus = 'disconnected'
      console.error('❌ Error connecting WhatsApp:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const checkConnectionStatus = async () => {
    if (!whatsappConnection.value.sessionId) return null

    try {
      // Use mock data for now - Replace with actual API when ready
      console.log('🔍 Checking WhatsApp Connection Status (Mock):', {
        sessionId: whatsappConnection.value.sessionId,
        currentStatus: whatsappConnection.value.connectionStatus,
      })

      // Mock status response - connection is already handled in initiateWhatsAppConnection
      const mockStatusResult = {
        success: true,
        sessionId: whatsappConnection.value.sessionId,
        connectionStatus: whatsappConnection.value.connectionStatus,
        phoneNumber: whatsappConnection.value.phoneNumber,
        lastActivity: new Date().toISOString(),
        messagesCount: Math.floor(Math.random() * 100),
      }

      console.log('✅ Connection Status Check (Mock):', mockStatusResult)
      return mockStatusResult

      // TODO: Uncomment when real API is ready
      // const response = await fetch(`/api/whatsapp/status/${whatsappConnection.value.sessionId}`, {
      //   headers: {
      //     'Authorization': `Bearer ${your_token}`
      //   }
      // })
      //
      // if (!response.ok) {
      //   throw new Error('Failed to check connection status')
      // }
      //
      // const result = await response.json()
      // whatsappConnection.value = {
      //   ...whatsappConnection.value,
      //   ...result.data
      // }
      //
      // if (result.data.connectionStatus === 'connected') {
      //   setShowSuccessDialog(true)
      // }
      // return result.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Status check failed'
      console.error('❌ Error checking connection status:', err)
      return null
    }
  }

  const disconnectWhatsApp = async () => {
    if (!whatsappConnection.value.sessionId) return false

    isLoading.value = true
    error.value = null

    try {
      // Use mock data for now - Replace with actual API when ready
      console.log('🔌 Disconnecting WhatsApp (Mock):', {
        sessionId: whatsappConnection.value.sessionId,
        timestamp: new Date().toISOString(),
      })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful disconnect
      const sessionId = whatsappConnection.value.sessionId

      // Reset connection data
      whatsappConnection.value = {
        connectionStatus: 'disconnected',
      }

      console.log('✅ WhatsApp Disconnected Successfully (Mock):', { sessionId })
      return true

      // TODO: Uncomment when real API is ready
      // const response = await fetch(`/api/whatsapp/disconnect/${whatsappConnection.value.sessionId}`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${your_token}`
      //   }
      // })
      //
      // if (!response.ok) {
      //   throw new Error('Failed to disconnect WhatsApp')
      // }
      //
      // whatsappConnection.value = {
      //   connectionStatus: 'disconnected'
      // }
      // return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Disconnect failed'
      console.error('❌ Error disconnecting WhatsApp:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Actions - Reset functions
  const resetBusinessData = () => {
    businessData.value = {
      category: '',
      types: [],
    }
  }

  const resetConnection = () => {
    whatsappConnection.value = {
      connectionStatus: 'disconnected',
    }
  }

  const resetAll = () => {
    resetBusinessData()
    resetConnection()
    currentStep.value = 1
    error.value = null
    isLoading.value = false
    closeDropdowns()
    setShowSuccessDialog(false)
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    businessData,
    whatsappConnection,
    currentStep,
    isLoading,
    error,
    isCategoriesDropdownOpen,
    isTypeDropdownOpen,
    showSuccessDialog,
    categories,
    businessTypes,

    // Computed
    availableTypes,
    canProceedToStep2,
    isConnected,

    // Actions - Business Data
    setBusinessCategory,
    addBusinessType,
    removeBusinessType,
    updateBusinessData,

    // Actions - UI State
    toggleCategoriesDropdown,
    toggleTypeDropdown,
    closeDropdowns,
    setCurrentStep,
    setShowSuccessDialog,

    // Actions - API
    saveBusiness,
    initiateWhatsAppConnection,
    checkConnectionStatus,
    disconnectWhatsApp,

    // Actions - Reset
    resetBusinessData,
    resetConnection,
    resetAll,
    clearError,
  }
})
