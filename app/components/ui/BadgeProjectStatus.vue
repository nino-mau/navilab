<template>
  <template v-if="props.status === 'not started'">
    <UBadge
      :label="capitalizeFirstChar(props.status)"
      size="md"
      color="neutral"
      class="bg-slate-400"
      variant="solid"
    />
  </template>
  <template v-if="props.status === 'in progress'">
    <UBadge
      :label="capitalizeFirstChar(props.status)"
      size="md"
      color="warning"
      variant="subtle"
    />
  </template>
  <template v-if="props.status === 'finished'">
    <UBadge
      :label="capitalizeFirstChar(props.status)"
      size="md"
      color="success"
      variant="subtle"
    />
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
