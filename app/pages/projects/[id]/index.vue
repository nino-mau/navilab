<template>
  <div class="mx-12 mt-12 flex h-full flex-col gap-6">
    <!-- Button: Go back to home -->
    <UButton
      variant="subtle"
      size="xl"
      label="Back to home"
      icon="i-lucide-arrow-left"
      color="neutral"
      class="w-fit"
      to="/"
    />

    <!-- Project Heading Card -->
    <div class="card flex h-fit flex-col gap-6">
      <div class="flex flex-col gap-4">
        <!-- Project Name -->
        <div class="flex flex-row items-center gap-5">
          <h1 class="text-highlighted text-4xl font-bold">Project Name</h1>
          <UiBadgeProjectStatus :status="'not started'" />
        </div>

        <!-- Project Description -->
        <p class="text-default">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          neque asperiores obcaecati quia. Ipsam, cum?
        </p>
      </div>
      <div class="flex flex-row gap-25">
        <!-- Project Specie -->
        <div class="flex flex-row items-center gap-2">
          <div
            class="bg-primary flex items-center justify-center rounded-sm p-1"
          >
            <LucideBird :size="15" />
          </div>
          <p class="text-default">Specie</p>
        </div>

        <!-- Project Location Label -->
        <div class="flex flex-row items-center gap-2">
          <div
            class="bg-primary flex items-center justify-center rounded-sm p-1"
          >
            <LucideMapPin :size="15" />
          </div>
          <p class="text-default">Location Label</p>
        </div>

        <!-- Project Detectors Count -->
        <div class="flex flex-row items-center gap-2">
          <div
            class="bg-primary flex items-center justify-center rounded-sm p-1"
          >
            <LucideRadar :size="15" />
          </div>
          <p class="text-default">5 Detectors</p>
        </div>

        <!-- Project Contributors Count -->
        <div class="flex flex-row items-center gap-2">
          <div
            class="bg-primary flex items-center justify-center rounded-sm p-1"
          >
            <LucideUsers :size="15" />
          </div>
          <p class="text-default">5 Contributors</p>
        </div>
      </div>
    </div>

    <!-- Tab Menu -->
    <UTabs
      size="xl"
      color="primary"
      :items="projectTabs"
      :ui="{ list: 'w-fit mr-auto', trigger: 'px-7' }"
      class="size-full"
    >
      <template #overview>
        <ProjectTabOverview />
      </template>

      <template #detectors>
        <ProjectTabDetectors />
      </template>

      <template #contributors>
        <ProjectTabContributors />
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { useRoute } from 'vue-router';

const route = useRoute();
const projectId = route.params.id; // or route.params.projectId if you named it [projectId].vue

const projectTabs = computed(() => [
  {
    label: 'Overview',
    slot: 'overview' as const
  },
  {
    label: 'Map',
    slot: 'map' as const
  },
  {
    label: 'Detectors',
    badge: 0,
    slot: 'detectors' as const
  },
  {
    label: 'Contributors',
    badge: 0,
    slot: 'contributors' as const
  }
]) satisfies ComputedRef<TabsItem[]>;
</script>
