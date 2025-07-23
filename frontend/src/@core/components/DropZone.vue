<script setup>
import {
  useDropZone,
  useFileDialog,
  useObjectUrl,
} from '@vueuse/core'

// Emit selected files to parent
const emit = defineEmits(['update:modelValue'])
const dropZoneRef = ref()
const fileData = ref([])

// Allow multiple file selection
const { open, onChange } = useFileDialog({ accept: 'image/*', multiple: true })
function onDrop(DroppedFiles) {
  DroppedFiles?.forEach(file => {
    if (file.type.slice(0, 6) !== 'image/') {
      alert('Only image files are allowed')
      
      return
    }
    if (fileData.value.length < 3) {
      fileData.value.push({
        file,
        url: useObjectUrl(file).value ?? '',
      })
    }
  })
  emit('update:modelValue', fileData.value)
}
onChange(selectedFiles => {
  if (!selectedFiles) return
  for (const file of selectedFiles) {
    if (fileData.value.length < 3) {
      fileData.value.push({
        file,
        url: useObjectUrl(file).value ?? '',
      })
    }
  }
  emit('update:modelValue', fileData.value)
})
useDropZone(dropZoneRef, onDrop)
</script>

<template>
  <div class="flex">
    <div class="w-full h-auto relative">
      <!-- Picker (dotted box) always visible unless max images -->
      <div
        ref="dropZoneRef"
        class="cursor-pointer"
        :class="{ 'drop-zone-disabled': fileData.length >= 3 }"
        @click="() => { if (fileData.length < 3) open() }"
      >
        <div
          class="d-flex flex-column justify-center align-center gap-y-2 pa-12 drop-zone rounded"
          :style="fileData.length >= 3 ? 'opacity: 0.5; pointer-events: none;' : ''"
        >
          <IconBtn
            variant="tonal"
            class="rounded-sm"
          >
            <VIcon icon="tabler-upload" />
          </IconBtn>
          <h4 class="text-h4">
            Drag and drop your image here.
          </h4>
          <span class="text-disabled">or</span>
          <VBtn
            variant="tonal"
            size="small"
            :disabled="fileData.length >= 3"
          >
            Browse Images
          </VBtn>
        </div>
      </div>
      <!-- Preview section always below picker -->
      <div
        v-if="fileData.length > 0"
        class="d-flex justify-center align-center gap-3 pa-8 flex-wrap"
      >
        <VRow class="match-height w-100">
          <template
            v-for="(item, index) in fileData"
            :key="index"
          >
            <VCol
              cols="12"
              sm="4"
            >
              <VCard :ripple="false">
                <VCardText
                  class="d-flex flex-column"
                  @click.stop
                >
                  <VImg
                    :src="item.url"
                    width="200px"
                    height="150px"
                    class="w-100 mx-auto"
                  />
                  <div class="mt-2">
                    <span class="clamp-text text-wrap">{{ item.file.name }}</span>
                    <span>{{ item.file.size / 1000 }} KB</span>
                  </div>
                </VCardText>
                <VCardActions>
                  <VBtn
                    variant="text"
                    block
                    @click.stop="fileData.splice(index, 1)"
                  >
                    Remove File
                  </VBtn>
                </VCardActions>
              </VCard>
            </VCol>
          </template>
        </VRow>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drop-zone {
  border: 1px dashed rgba(var(--v-theme-on-surface), var(--v-border-opacity));
}
.drop-zone-disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
