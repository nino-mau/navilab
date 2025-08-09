<template>
  <div class="mx-6 mt-6 flex h-full flex-col gap-6">
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
      <!-- Main Header Section -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-row items-start justify-between">
          <div class="flex flex-row items-center gap-4">
            <!-- Project Name -->
            <h1 class="text-highlighted text-4xl leading-tight font-bold">
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
              @click="deleteProjectWrapper"
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
        <div
          class="border-l-primary rounded-md border-0 border-l-3 border-slate-200 bg-slate-50 p-3"
        >
          <p class="text-default text-base leading-relaxed">
            {{ projectStore.project?.description }}
          </p>
        </div>
      </div>

      <!-- Project Metadata Grid -->
      <div class="flex flex-row gap-35">
        <!-- Project Specie -->
        <div class="flex items-center gap-3 rounded-lg">
          <div
            class="bg-primary flex h-8 w-8 items-center justify-center rounded-md"
          >
            <LucideBird :size="16" />
          </div>
          <div class="flex min-w-0 flex-col">
            <span class="text-muted text-xs uppercase">Species</span>
            <p class="text-default truncate text-sm font-medium">
              {{ projectStore.project?.specieName }}
            </p>
          </div>
        </div>

        <!-- Project Location Label -->
        <div class="flex items-center gap-3 rounded-lg">
          <div
            class="bg-primary flex h-8 w-8 items-center justify-center rounded-md"
          >
            <LucideMap :size="16" />
          </div>
          <div class="flex min-w-0 flex-col">
            <span class="text-muted text-xs uppercase">Location</span>
            <p class="text-default truncate text-sm font-medium">
              {{ projectStore.project?.locationLabel }}
            </p>
          </div>
        </div>

        <!-- Project Detectors Count -->
        <div class="flex items-center gap-3 rounded-lg">
          <div
            class="bg-primary flex h-8 w-8 items-center justify-center rounded-md"
          >
            <LucideRadar :size="16" />
          </div>
          <div class="flex min-w-0 flex-col">
            <span class="text-muted text-xs uppercase">Detectors</span>
            <p class="text-default text-sm font-medium">
              {{ projectStore.detectorsCount }}
              {{ projectStore.detectorsCount === 1 ? 'Device' : 'Devices' }}
            </p>
          </div>
        </div>

        <!-- Project Contributors Count -->
        <div class="flex items-center gap-3 rounded-lg">
          <div
            class="bg-primary flex h-8 w-8 items-center justify-center rounded-md"
          >
            <LucideUsers :size="16" />
          </div>
          <div class="flex min-w-0 flex-col">
            <span class="text-muted text-xs uppercase">Team</span>
            <p class="text-default text-sm font-medium">
              {{ projectStore.contributorsCount }}
              {{ projectStore.contributorsCount === 1 ? 'Member' : 'Members' }}
            </p>
          </div>
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
        <ProjectTabOverview
          v-if="projectStore.project"
          :project="projectStore.project"
          :detectors-count="projectStore.detectorsCount"
          :contributors-count="projectStore.contributorsCount"
          :active-detectors-count="projectStore.activeDetectorsCount"
          :active-contributors-count="projectStore.activeContributorsCount"
        />
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
          :requests="projectStore.pendingRequests"
        />
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { useRoute } from 'vue-router';

const session = await authClient.getSession();
const projectStore = useProjectStore();

const route = useRoute();
const projectId = route.params.id as string;

await projectStore.fetch(projectId, session.data!.user.id);

const { confirm } = useConfirmModal();

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

const deleteProjectWrapper = async (event: Event) => {
  // Prevent card link to trigger on delete button click
  event.preventDefault();
  event.stopPropagation();

  const confirmed = await confirm({
    title: 'Delete Project',
    desc: `Are you sure you want to delete "${projectStore.project?.name}" ? This action cannot be undone.`,
    icon: 'i-lucide-circle-x'
  });

  if (!confirmed) return;

  navigateTo('/projects');

  try {
    await projectStore.delete(projectId, session.data!.user.id);
  } catch (err) {
    console.error('[deleteProjectWrapper] Failed to delete project: \n:', err);
  }
};

onMounted(async () => {
  if (!projectId || typeof projectId !== 'string') {
    return navigateTo('/404');
  }
});
</script>
