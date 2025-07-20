<template>
  <div class="flex h-screen w-screen flex-col justify-start">
    <!-- Background Element -->
    <div class="backgroundSvgGrid absolute z-0 size-full" />
    <slot />
  </div>
</template>

<style lang="css" scoped>
.backgroundSvgWaves {
  background-image: var(--bg-svg-waves);
  background-attachment: fixed;
  background-size: cover;
}

.backgroundSvgGrid {
  background-image: var(--bg-svg-grid);
  background-attachment: fixed;
  background-size: cover;
}

.backgroundSvgWeb {
  background-image: var(--bg-svg-web);
  background-attachment: fixed;
  background-size: cover;
}

.backgroundSvgLeafs {
  background-image: var(--bg-svg-leafs);
  background-size: cover;
}
</style>
