<template>
  <div class="mx-12 mt-12 flex h-full flex-col gap-8">
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

    <!-- Heading Section -->
    <div class="flex flex-row items-center justify-between">
      <div class="flex flex-col gap-1">
        <h1
          class="from-primary !to-primary/70 w-fit bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent"
        >
          Manage Your Projects
        </h1>
        <p>
          Create and edit projects, manage contributors, see requests and
          pending invites...
        </p>
      </div>
      <!-- Button: Create Detector -->
      <UButton
        variant="solid"
        size="xl"
        color="primary"
        label="Create
          Project"
        icon="i-lucide-plus"
        class="h-fit"
        to="/projects/create"
      />
    </div>

    <!-- Tab Menu -->
    <UTabs
      size="xl"
      color="primary"
      :ui="{ content: 'size-full', list: 'w-fit mr-auto', trigger: 'px-7' }"
      :items="tabs"
      class="size-full"
    >
      <!-- Tab: Projects -->
      <template #projects>
        <!-- Empty State -->
        <div
          v-if="!requestsStore.requests.length"
          class="flex size-full items-center justify-center pb-12"
        >
          <UiEmptyState
            label="No Projects"
            desc="You currently do not have any project, create one to start using our features"
            :icon="LucideLayers"
          />
        </div>

        <!-- Projects List -->
        <TransitionGroup
          name="slide-left"
          tag="ul"
          class="grid-rows-[minmax(260px, 280px)_minmax(260px, 280px)] grid grid-cols-2 gap-6 pt-6"
          appear
        >
          <li
            v-for="(project, index) in projectsStore.projects"
            :key="project.id"
            class="col-span-1 row-span-1"
            :style="{ transitionDelay: `${Math.floor(index / 2) * 150}ms` }"
          >
            <UiCardProject :project="project" />
          </li>
        </TransitionGroup>
      </template>

      <!-- Tab: Requests -->
      <template #requests>
        <!-- Empty State -->
        <div
          v-if="!requestsStore.requests.length"
          class="flex size-full items-center justify-center pb-12"
        >
          <UiEmptyState
            label="No Pending Requests"
            desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, suscipit quis deleniti !"
            :icon="LucideMails"
          />
        </div>

        <!-- Requests List -->
        <TransitionGroup
          v-else
          name="slide-left"
          tag="ul"
          class="grid grid-cols-2 gap-6 pt-6"
          appear
        >
          <li
            v-for="(request, index) in requestsStore.requests"
            :key="request.id"
            class="col-span-1"
            :style="{ transitionDelay: `${Math.floor(index / 2) * 150}ms` }"
          >
            <UiCardRequest :request="request" />
          </li>
        </TransitionGroup>
      </template>

      <!-- Tab: Invites -->
      <template #pendingInvites>
        <!-- Empty State -->
        <div
          v-if="!requestsStore.requests.length"
          class="flex size-full items-center justify-center pb-12"
        >
          <UiEmptyState
            label="No Pending Invites"
            desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, suscipit quis deleniti !"
            :icon="LucideMailPlus"
          />
        </div>

        <!-- Invites List -->
        <TransitionGroup
          name="list"
          tag="ul"
          class="flex flex-col gap-6 pt-6"
          appear
        >
          <li
            v-for="(invite, index) in invitesStore.invites"
            :key="invite.id"
            class="h-fit w-full"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <UiCardInvite :invite="invite" />
          </li>
        </TransitionGroup>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import { LucideLayers, LucideMailPlus, LucideMails } from '#components';
import type { TabsItem } from '@nuxt/ui';

const session = await authClient.getSession();

const projectsStore = useProjectsStore();
const requestsStore = useRequestsStore();
const invitesStore = useInvitesStore();

// Update used store state
await projectsStore.fetch(session.data!.user.id);
await requestsStore.fetch(session.data!.user.id);
await invitesStore.fetch(session.data!.user.id);

const activeTab = ref(2);

watch(
  () => activeTab.value,
  (newValue) => {
    console.log(newValue);
  }
);

const tabs = computed(() => [
  {
    label: 'Projects',
    badge:
      projectsStore.projects.length > 0
        ? projectsStore.projects.length
        : undefined,
    slot: 'projects' as const
  },
  {
    label: 'Requests',
    badge:
      requestsStore.requests.length > 0
        ? requestsStore.requests.length
        : undefined,

    slot: 'requests' as const
  },
  {
    label: 'Pending Invites',
    badge:
      invitesStore.invites.length > 0 ? invitesStore.invites.length : undefined,

    slot: 'pendingInvites' as const
  }
]) satisfies ComputedRef<TabsItem[]>;
</script>
