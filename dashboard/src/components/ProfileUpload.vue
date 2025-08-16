<template>
  <div class="flex items-start gap-3">
    <!-- Preview -->
    <label for="profile" class="size-16 rounded-full border border-border-light overflow-hidden">
      <img v-if="previewUrl" :src="previewUrl" alt="Profile Preview" class="w-full h-full object-cover" />
      <div v-else class="w-full h-full flex items-center justify-center text-xs text-secondary bg-gray-100">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1252_8807)">
            <ellipse cx="32.0004" cy="62.4002" rx="25.6" ry="19.2" fill="white" fill-opacity="0.72" />
            <circle opacity="0.9" cx="32.0002" cy="25.5998" r="12.8" fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_1252_8807">
              <rect width="64" height="64" rx="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </label>

    <!-- File Input -->
    <div class="relative">
      <h5 class="text-sm font-medium text-strong">Upload Image</h5>
      <p class="text-xs text-secondary mt-1">Min 400x400px, PNG or JPEG</p>
      <div class="mt-2">
        <label for="profile" type="button"
          class="px-2.5 py-1.5 border border-border-light text-secondary rounded-md text-sm font-medium">
          Upload
        </label>
      </div>
      <input type="file" id="profile" accept="image/*" @change="uploadFile" ref="fileInput"
        class="opacity-0 absolute w-0 h-0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  prefix?: string   // optional filename prefix
}>()

const emit = defineEmits<{
  (e: 'uploaded', value: string): void // emits filename from server
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)

const uploadFile = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || !target.files[0]) return

  const file = target.files[0]

  // Optional preview before upload
  previewUrl.value = URL.createObjectURL(file)

  const formData = new FormData()
  const prefixedName = `${props.prefix || 'profile'}_${Date.now()}_${file.name}`
  formData.append('file', file, prefixedName)

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (!res.ok) throw new Error('Upload failed')
    const data = await res.json()

    // Expecting API to return { filename: "stored_file_name.jpg" }
    emit('uploaded', data.filename)
  } catch (err) {
    console.error('Upload error:', err)
  }
}
</script>
