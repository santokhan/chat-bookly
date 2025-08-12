<script setup>
const props = defineProps({
  showSearchIcon: {
    type: Boolean,
    default: false,
  },
})

defineOptions({
  name: 'AppTextField',
  inheritAttrs: false,
})

const elementId = computed(() => {
  const attrs = useAttrs()
  const _elementIdToken = attrs.id
  const _id = useId()

  return _elementIdToken ? `app-text-field-${ _elementIdToken }` : _id
})

const label = computed(() => useAttrs().label)
</script>

<template>
  <div :class="$attrs.class">
    <VLabel
      v-if="label"
      :for="elementId"
      style="line-height: 15px;"
      v-html="label"
    />
    <!--    :text="label" -->
    <VTextField
      v-bind="{
        ...$attrs,
        class: null,
        label: undefined,
        variant: 'outlined',
        id: elementId,
        'prepend-inner-icon': props.showSearchIcon ? 'tabler-search' : undefined,
      }"
    >
      <template
        v-for="(_, name) in $slots"
        #[name]="slotProps"
      >
        <slot
          :name="name"
          v-bind="slotProps || {}"
        />
      </template>
    </VTextField>
  </div>
</template>
