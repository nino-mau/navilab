<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.width"
    :height="props.height"
    fill="none"
  >
    <path
      :stroke="props.color"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M12.75 12.5c.555-1.714 2.084-2.822 3.75-2.25-.13-1.946.098-3.985-1.5-5.625-1.281 1.986-2.518 1.918-3.75 1.875v-3L9 5 6.75 3.5v3c-1.231.043-2.469.111-3.75-1.875-1.597 1.64-1.37 3.679-1.5 5.625 1.667-.572 3.195.536 3.75 2.25 1.945 0 2.917.714 3.75 3 .833-2.286 1.805-3 3.75-3"
    />
    <path
      :stroke="props.color"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M6.75 6.5a2.25 2.25 0 1 0 4.5 0"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: Number,
    default: 18
  },
  height: {
    type: Number,
    default: 19
  },
  color: {
    type: String,
    default: 'var(--ui-text)'
  }
});
</script>
