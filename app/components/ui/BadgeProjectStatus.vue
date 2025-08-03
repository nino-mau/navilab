<template>
  <template v-if="props.status === 'not started'">
    <UBadge
      :label="capitalizeFirstChar(props.status)"
      :size="props.size"
      color="neutral"
      class="size-fit bg-slate-400"
      variant="solid"
    />
  </template>
  <template v-if="props.status === 'in progress'">
    <UBadge
      :label="capitalizeFirstChar(props.status)"
      :size="props.size"
      color="warning"
      class="size-fit"
      variant="subtle"
    />
  </template>
  <template v-if="props.status === 'finished'">
    <UBadge
      :label="capitalizeFirstChar(props.status)"
      :size="props.size"
      color="success"
      class="size-fit"
      variant="subtle"
    />
  </template>
</template>

<script setup lang="ts">
import type { BadgeProps } from '@nuxt/ui';

interface Props {
  status: ProjectStatus;
  size?: BadgeProps['size'];
}
const props = withDefaults(defineProps<Props>(), {
  size: 'md'
});
</script>
