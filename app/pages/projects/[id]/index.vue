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
        <div class="flex flex-row justify-between">
          <div class="flex flex-row items-center gap-5">
            <!-- Project Name -->
            <h1 class="text-highlighted text-4xl font-bold">
              {{ capitalizeFirstChar(projectStore.project?.name || '') }}
            </h1>
            <!-- Project Status -->
            <UiBadgeProjectStatus
              v-if="projectStore.project"
              size="lg"
              :status="projectStore.project?.status"
            />
          </div>
          <div class="flex flex-row gap-3">
            <!-- Button: Delete Project -->
            <UButton
              size="lg"
              class="size-fit"
              color="neutral"
              variant="subtle"
              icon="i-lucide-trash"
            />
            <!-- Button: Open Project Menu -->
            <UButton
              size="lg"
              class="size-fit"
              color="neutral"
              variant="subtle"
              icon="i-lucide-ellipsis"
            />
          </div>
        </div>

        <!-- Project Description -->
        <p class="text-default rounded-sm bg-slate-200 p-3">
          {{ projectStore.project?.description }}
        </p>
      </div>
      <div class="flex flex-row gap-12">
        <!-- Project Specie -->
        <div class="flex flex-row items-center gap-2">
          <div
            class="bg-primary flex items-center justify-center rounded-sm p-1"
          >
            <LucideBird :size="15" />
          </div>
          <p class="text-default">{{ projectStore.project?.specieName }}</p>
        </div>

        <!-- Project Location Label -->
        <div class="flex flex-row items-center gap-2">
          <div
            class="bg-primary flex items-center justify-center rounded-sm p-1"
          >
            <LucideMap :size="15" />
          </div>
          <p class="text-default">
            {{ projectStore.project?.locationLabel }}
          </p>
        </div>

        <!-- Project Detectors Count -->
        <div class="flex flex-row items-center gap-2">
          <div
            class="bg-primary flex items-center justify-center rounded-sm p-1"
          >
            <LucideRadar :size="15" />
          </div>
          <p class="text-default">
            {{ projectStore.detectorsCount }}
            {{ projectStore.detectorsCount === 1 ? 'Detector' : 'Detectors' }}
          </p>
        </div>

        <!-- Project Contributors Count -->
        <div class="flex flex-row items-center gap-2">
          <div
            class="bg-primary flex items-center justify-center rounded-sm p-1"
          >
            <LucideUsers :size="15" />
          </div>
          <p class="text-default">
            {{ projectStore.contributorsCount }}
            {{
              projectStore.contributorsCount === 1
                ? 'Contributor'
                : 'Contributors'
            }}
          </p>
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
        <ProjectTabDetectors
          v-if="projectStore.project"
          :detectors="projectStore.project?.detectors"
        />
      </template>

      <template #contributors>
        <ProjectTabContributors
          v-if="projectStore.project"
          :contributors="projectStore.project.contributors"
          :requests="projectStore.project.requests"
        />
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { useRoute } from 'vue-router';

const session = await authClient.getSession();

const route = useRoute();
const projectId = route.params.id as string;

const projectStore = useProjectStore();

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
    badge:
      projectStore.detectorsCount > 0 ? projectStore.detectorsCount : undefined,
    slot: 'detectors' as const
  },
  {
    label: 'Team',
    badge:
      projectStore.requestsCount > 0 ? projectStore.requestsCount : undefined,
    slot: 'contributors' as const
  }
]) satisfies ComputedRef<TabsItem[]>;

onMounted(async () => {
  if (!projectId || typeof projectId !== 'string') {
    return navigateTo('/404');
  }
  await projectStore.fetch(projectId, session.data!.user.id);
});
</script>
