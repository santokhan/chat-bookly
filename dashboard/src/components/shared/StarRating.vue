<template>
  <p v-if="!rating" class="text-sm text-secondary font-normal">No reviews yet</p>
  <div v-else class="flex items-center gap-0.5" :title="rating.toFixed(1)">
    <template v-for="n in 5" :key="n">
      <!-- Full Star -->
      <svg v-if="n <= fullStars" width="18" height="18" viewBox="0 0 18 18" fill="#F6B51E"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.75 6.69221L11.5925 5.95272L8.99671 0.25L6.40096 5.95272L0.25 6.69221L4.7975 10.9626L3.59491 17.125L8.99671 14.0538L14.4051 17.125L13.2025 10.9626L17.75 6.69221Z" />
      </svg>

      <!-- Half Star -->
      <svg v-else-if="n === fullStars + 1 && hasHalfStar" width="20" height="20" viewBox="0 0 20 20" fill="#F6B51E"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.75 7.69476L12.5925 6.95497L9.99671 1.25L7.40096 6.95497L1.25 7.69476L5.7975 11.9602L4.58834 18.125L9.99671 15.0526L15.4051 18.125L14.1959 11.9602L18.7434 7.69476H18.75ZM10.0033 13.533V4.43572L11.7119 8.19461L15.7665 8.68113L12.7699 11.4936L13.5651 15.5524L10.0033 13.533Z" />
      </svg>

      <!-- Empty Star -->
      <svg v-else width="18" height="18" viewBox="0 0 18 18" fill="#E0E0E0" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.75 6.69221L11.5925 5.95272L8.99671 0.25L6.40096 5.95272L0.25 6.69221L4.7975 10.9626L3.59491 17.125L8.99671 14.0538L14.4051 17.125L13.2025 10.9626L17.75 6.69221Z" />
      </svg>
    </template>
  </div>
</template>

<script>
export default {
  name: "StarRating",
  props: {
    rating: {
      type: Number,
      required: true
    }
  },
  computed: {
    fullStars() {
      return Math.floor(this.rating);
    },
    hasHalfStar() {
      return this.rating - Math.floor(this.rating) >= 0.5;
    }
  }
};
</script>

<style scoped>
svg {
  display: inline-block;
}
</style>
