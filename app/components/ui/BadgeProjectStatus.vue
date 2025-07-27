<template>
  <template v-if="props.status === 'not started'">
    <UBadge
      :label="capitalizeFirstLetter(props.status)"
      size="md"
      color="neutral"
      class="bg-slate-400"
      variant="solid"
    />
  </template>
  <template v-if="props.status === 'in progress'">
    <UBadge
      :label="capitalizeFirstLetter(props.status)"
      size="md"
      color="warning"
      variant="subtle"
    />
  </template>
  <template v-if="props.status === 'finished'">
    <UBadge
      :label="capitalizeFirstLetter(props.status)"
      size="md"
      color="success"
      variant="subtle"
    />
  </template>
</template>

<script setup lang="ts">
import { capitalizeFirstLetter } from 'better-auth';

const props = defineProps({
  status: {
    type: String as PropType<ProjectStatus>,
    required: true
  }
});
</script>
