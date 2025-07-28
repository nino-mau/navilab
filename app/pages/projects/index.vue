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
      :ui="{ content: 'w-full', list: 'w-[35%] mr-auto' }"
      :items="tabs"
      class="w-full"
    >
      <!-- Tab: Projects -->
      <template #projects>
        <div
          class="grid-rows-[minmax(260px, 280px)_minmax(260px, 280px)] grid grid-cols-2 gap-6 pt-6"
        >
          <div
            v-for="project in projectsStore.projects"
            :key="project.id"
            class="col-span-1 row-span-1"
          >
            <UiCardProject :project="project" />
          </div>
        </div>
      </template>

      <!-- Tab: Requests -->
      <template #requests>
        <div class="grid grid-cols-2 gap-6 pt-6">
          <div
            v-for="request in requestsStore.requests"
            :key="request.id"
            class="col-span-1 h-fit"
          >
            <UiCardRequest :request="request" />
          </div>
        </div>
      </template>

      <!-- Tab: Invites -->
      <template #pendingInvites>
        <div class="flex flex-col gap-6 pt-6">
          <div
            v-for="invite in invitesStore.invites"
            :key="invite.id"
            class="h-fit w-full"
          >
            <UiCardInvite :invite="invite" />
          </div>
        </div>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';

const session = await authClient.getSession();

const projectsStore = useProjectsStore();
const requestsStore = useRequestsStore();
const invitesStore = useInvitesStore();

const tabs = computed(() => [
  {
    label: 'Projects',
    badge: projectsStore.projects.length,
    slot: 'projects' as const
  },
  {
    label: 'Requests',
    badge: requestsStore.requests.length,
    slot: 'requests' as const
  },
  {
    label: 'Pending Invites',
    badge: invitesStore.invites.length,
    slot: 'pendingInvites' as const
  }
]) satisfies ComputedRef<TabsItem[]>;

onMounted(async () => {
  // Update used store state
  await projectsStore.fetch(session.data!.user.id);
  await requestsStore.fetch(session.data!.user.id);
  await invitesStore.fetch(session.data!.user.id);
});
</script>
