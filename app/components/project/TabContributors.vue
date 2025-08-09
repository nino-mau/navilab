<template>
  <div class="mt-4 grid size-full grid-cols-[5.5fr_3.5fr] gap-6">
    <!-- Contributors List -->
    <TransitionGroup
      name="list"
      tag="ul"
      class="col-span-1 grid h-fit grid-cols-2 gap-6"
      appear
    >
      <li
        v-for="(contributor, index) in props.contributors"
        :key="contributor.id"
        class="col-span-1 h-fit"
        :style="{ transitionDelay: `${Math.floor(index / 2) * 150}ms` }"
      >
        <UiCardContributor :contributor="contributor" />
      </li>
    </TransitionGroup>

    <!-- Card: Project Join Requests -->
    <div class="card col-span-1 flex h-fit flex-col">
      <div
        v-if="props.requests.length !== 0"
        class="flex flex-row items-center gap-3"
      >
        <div
          class="bg-primary flex size-fit items-center justify-center rounded-sm p-1.5"
        >
          <LucideMail :size="20" />
        </div>
        <h2 class="text-highlighted text-2xl font-bold">Requests</h2>
      </div>

      <!-- Empty State -->
      <div
        v-if="props.requests.length === 0"
        class="my-5 flex size-full items-center justify-center"
      >
        <UiEmptyState
          label="No Requests"
          desc="Your project currently does not have any request, you can invite your team members to join your project."
          :has-button="false"
          :icon="LucideMail"
        />
      </div>

      <!-- Requests List -->
      <TransitionGroup
        v-else
        name="list"
        tag="ul"
        class="flex max-h-full flex-col gap-4 pt-6"
        appear
      >
        <li
          v-for="(request, index) in props.requests"
          :key="request.id"
          :style="{ transitionDelay: `${Math.floor(index / 2) * 150}ms` }"
        >
          <UiCardRequestSmall :request="request" />
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LucideMail } from '#components';

interface Props {
  contributors: ProjectDetailsClient['contributors'];
  requests: ProjectDetailsClient['requests'];
}
const props = defineProps<Props>();

const session = await authClient.getSession();

const requestsStore = useRequestsStore();
await requestsStore.fetch(session.data!.user.id);
</script>
