<template>
  <div class="my-auto flex flex-col items-center">
    <div class="bg-primary flex size-16 items-center justify-center rounded-sm">
      <component :is="props.icon" v-if="props.icon" :size="32" />
    </div>

    <div class="mt-3 flex flex-col items-center gap-1">
      <!-- Label -->
      <h2 class="text-default text-xl font-semibold">{{ props.label }}</h2>
      <!-- Description -->
      <p class="text-dimmed max-w-[400px] text-center">{{ props.desc }}</p>
    </div>

    <UButton
      v-if="props.hasButton"
      variant="outline"
      color="neutral"
      :label="props.buttonLabel"
      size="xl"
      class="mt-6"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  buttonLabel?: string;
  desc?: string;
  icon: LucideIcon;
  hasButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'No Projects',
  buttonLabel: 'Create Project',
  desc: 'You currently do not have any project, create one to start using our features',
  hasButton: true
});
</script>
