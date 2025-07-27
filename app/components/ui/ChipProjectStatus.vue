<template>
  <template v-if="props.status === 'not started'">
    <UChip
      size="xl"
      color="neutral"
      class="mt-1 bg-slate-400"
      variant="solid"
    />
  </template>
  <template v-if="props.status === 'in progress'">
    <UChip size="xl" class="mt-1" color="warning" variant="subtle" />
  </template>
  <template v-if="props.status === 'finished'">
    <UChip size="xl" class="mt-1" color="success" variant="subtle" />
  </template>
</template>

<script setup lang="ts">
const props = defineProps({
  status: {
    type: String as PropType<ProjectStatus>,
    required: true
  }
});
</script>
