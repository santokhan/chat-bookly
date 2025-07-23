<script setup>
import { Loader } from '@googlemaps/js-api-loader'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  apiKey: {
    type: String,
    required: true,
  },
  initialAddress: {
    type: String,
    default: '',
  },
  initialLat: {
    type: Number,
    default: 41.9028, // Rome coordinates as default
  },
  initialLng: {
    type: Number,
    default: 12.4964,
  },
})

const emit = defineEmits(['locationChanged', 'addressChanged'])

const mapContainer = ref(null)
const autocompleteInput = ref(null)
const map = ref(null)
const marker = ref(null)
const autocomplete = ref(null)
const currentAddress = ref(props.initialAddress)

// Initialize Google Maps
const initMap = async () => {
  console.log('Initializing Google Maps with API key:', props.apiKey ? 'API key provided' : 'No API key')
  
  const loader = new Loader({
    apiKey: props.apiKey,
    version: 'beta',
    libraries: ['places'],
  })

  try {
    console.log('Loading Google Maps...')

    const google = await loader.load()

    console.log('Google Maps loaded successfully')

    // Check if Places API is available
    if (!google.maps.places) {
      console.error('Places API not loaded. Make sure Places API is enabled in your Google Cloud Console.')
      
      return
    }

    // Create map
    map.value = new google.maps.Map(mapContainer.value, {
      center: { lat: props.initialLat, lng: props.initialLng },
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    })

    console.log('Map created successfully')

    // Create marker
    marker.value = new google.maps.Marker({
      position: { lat: props.initialLat, lng: props.initialLng },
      map: map.value,
      draggable: true,
      title: 'Drag to adjust location',
    })

    console.log('Marker created successfully')

    // Create autocomplete
    if (autocompleteInput.value) {
      console.log('Creating autocomplete...')
      autocomplete.value = new google.maps.places.Autocomplete(autocompleteInput.value, {
        types: ['address'],

        // Remove country restriction to allow global addresses
        // componentRestrictions: { country: 'it' },
      })

      console.log('Autocomplete created successfully')

      // Test autocomplete on focus
      autocompleteInput.value.addEventListener('focus', () => {
        console.log('Autocomplete input focused')
      })

      // Handle place selection
      autocomplete.value.addListener('place_changed', () => {
        console.log('Place selected from autocomplete')

        const place = autocomplete.value.getPlace()

        console.log('Selected place:', place)

        if (place.geometry) {
          const lat = place.geometry.location.lat()
          const lng = place.geometry.location.lng()

          console.log('Place coordinates:', { lat, lng })

          // Update map and marker
          map.value.setCenter({ lat, lng })
          marker.value.setPosition({ lat, lng })

          // Update address
          currentAddress.value = place.formatted_address
          emit('addressChanged', place.formatted_address)
          emit('locationChanged', { lat, lng, address: place.formatted_address })
        } else {
          console.warn('Selected place has no geometry')
        }
      })
    } else {
      console.error('Autocomplete input not found')
    }

    // Handle marker drag
    marker.value.addListener('dragend', () => {
      console.log('Marker dragged')

      const position = marker.value.getPosition()
      const lat = position.lat()
      const lng = position.lng()
      
      console.log('New marker position:', { lat, lng })
      
      // Reverse geocode to get address
      const geocoder = new google.maps.Geocoder()

      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        console.log('Geocoding result:', { status, results: results?.length })
        console.log('Full geocoding results:', results)
        
        if (status === 'OK' && results[0]) {
          const address = results[0].formatted_address

          console.log('New address:', address)
          console.log('Current address before update:', currentAddress.value)
          
          currentAddress.value = address

          // Also update the input field value
          if (autocompleteInput.value) {
            autocompleteInput.value.value = address
            console.log('Input field value updated to:', autocompleteInput.value.value)
          } else {
            console.error('Autocomplete input not found for update')
          }
          
          console.log('Current address after update:', currentAddress.value)
          emit('addressChanged', address)
          emit('locationChanged', { lat, lng, address })
        } else {
          console.error('Geocoding failed:', { status, results })
        }
      })
    })

  } catch (error) {
    console.error('Error loading Google Maps:', error)
    
    // Check for specific error types
    if (error.message.includes('API key')) {
      console.error('API key error - please check your Google Maps API key configuration')
    } else if (error.message.includes('billing')) {
      console.error('Billing error - please enable billing on your Google Cloud project')
    } else if (error.message.includes('quota')) {
      console.error('Quota exceeded - please check your Google Maps API usage limits')
    }
  }
}

// Watch for address changes from parent
watch(() => props.initialAddress, newAddress => {
  if (newAddress && newAddress !== currentAddress.value) {
    currentAddress.value = newAddress
    if (autocompleteInput.value) {
      autocompleteInput.value.value = newAddress
    }
  }
})

// Watch for currentAddress changes
watch(currentAddress, newAddress => {
  console.log('currentAddress changed to:', newAddress)
})

onMounted(() => {
  console.log('GoogleMapPicker mounted, API key:', props.apiKey ? 'Present' : 'Missing')
  if (props.apiKey) {
    initMap()
  } else {
    console.error('No Google Maps API key provided')
  }
})

// Expose methods for parent component
defineExpose({
  setLocation: (lat, lng) => {
    if (map.value && marker.value) {
      map.value.setCenter({ lat, lng })
      marker.value.setPosition({ lat, lng })
    }
  },
  getCurrentLocation: () => {
    if (marker.value) {
      const position = marker.value.getPosition()
      
      return {
        lat: position.lat(),
        lng: position.lng(),
        address: currentAddress.value,
      }
    }
    
    return null
  },
})
</script>

<template>
  <div class="google-map-picker">
    <!-- Autocomplete input -->
    <div class="autocomplete-container">
      <input
        ref="autocompleteInput"
        v-model="currentAddress"
        type="text"
        class="autocomplete-input"
        placeholder="Search for an address..."
      >
    </div>
    <div
      ref="mapContainer"
      class="map-container"
    />
    <div class="address-display">
      <div class="address-text">
        {{ currentAddress || 'No address selected' }}
      </div>
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.autocomplete-container {
  padding: 1rem;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.autocomplete-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.autocomplete-input:focus {
  border-color: #8B5CF6;
}

.google-map-picker {
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  background: #fafafa;
}

.map-container {
  height: 250px;
  width: 100%;
}

.address-display {
  background: #fff;
  border-top: 1px solid #eee;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
}

.address-text {
  flex: 1;
  line-height: 1.4;
}
</style> 
