<template>
  <div class="backgroundSvg flex h-screen items-center justify-center">
    <div class="flex flex-col items-center">
      <Illustrations404 v-if="showIllustration" class="mb-9" />
      <span v-else class="text-primary mb-4 text-9xl font-bold">404</span>
      <h1 class="text-text mb-4 text-4xl font-bold">Something’s missing</h1>
      <p class="text-text2 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <UButton
        color="primary"
        class="mt-8"
        label="Back to Homepage"
        size="xl"
        to="/"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const showIllustration = Math.random() < 0.5;
</script>

<style lang="css" scoped>
.backgroundSvg {
  background-image: var(--bg-svg-lines);
  background-size: cover;
}
</style>
