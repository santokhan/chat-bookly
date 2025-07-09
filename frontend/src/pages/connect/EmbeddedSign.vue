<template>
  <div class="embedded-signup-container">
    <v-card class="embedded-signup-box" elevation="4">
      <v-card-title class="text-h5 font-weight-bold mb-2">Connect Your Business</v-card-title>
      <v-card-subtitle class="mb-4">Easily connect your business to our platform using the embedded signup process.</v-card-subtitle>
      <v-card-actions>
        <v-btn color="primary" large>Start Embedded Signup</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
// No additional logic needed for now
</script>

<style scoped>
.embedded-signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}
.embedded-signup-box {
  width: 400px;
  padding: 32px 24px;
  border-radius: 16px;
  background: var(--v-theme-surface);
}
</style>
