<template>
  <TransitionGroup
    name="slide-left"
    tag="ul"
    class="mt-4 grid grid-cols-2 gap-6"
    appear
  >
    <div
      v-for="(detector, index) in props.detectors"
      :key="detector.id"
      class="hover-lift card flex h-fit flex-col !p-4 !pl-5 hover:shadow-xl"
      :style="{ transitionDelay: `${Math.floor(index / 2) * 150}ms` }"
    >
      <div class="flex flex-row items-center justify-between">
        <div class="flex flex-row items-center gap-5">
          <UChip color="success" size="xl" />
          <div class="flex flex-col gap-2">
            <div class="flex flex-row items-center gap-4">
              <h2 class="text-highlighted text-lg font-semibold">
                {{ capitalizeFirstChar(detector.name) }}
              </h2>
              <p class="text-default text-sm font-medium">
                {{ detector.type }}
              </p>
            </div>

            <!-- Detector Creator Email -->
            <UBadge
              :label="detector.creatorEmail"
              class="w-fit"
              color="neutral"
              variant="subtle"
              icon="i-lucide-user"
            />
          </div>
        </div>
        <div class="flex flex-row items-center justify-between gap-3">
          <!-- Button: Remove Detector -->
          <UButton
            icon="i-lucide-trash"
            class="size-fit"
            size="lg"
            color="error"
            variant="subtle"
          />
          <!-- Button: Open Detector Menu -->
          <UButton
            icon="i-lucide-ellipsis"
            class="size-fit"
            size="lg"
            color="neutral"
            variant="subtle"
          />
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
interface Props {
  detectors: ProjectDetailsClient['detectors'];
}

const props = defineProps<Props>();
</script>
