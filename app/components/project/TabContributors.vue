<template>
  <div class="mt-4 grid size-full grid-cols-[5.5fr_3.5fr] gap-6">
    <!-- Contributors List -->
    <ul class="col-span-1 grid h-fit grid-cols-2 gap-6">
      <li
        v-for="(contributor, index) in contributors"
        :key="contributor.id"
        class="col-span-1 h-fit"
        :style="{ transitionDelay: `${Math.floor(index / 2) * 150}ms` }"
      >
        <UiCardContributor :contributor="contributor" />
      </li>
    </ul>

    <!-- Card: Project Join Requests -->
    <div class="card col-span-1 flex h-fit flex-col">
      <div class="flex flex-row items-center gap-3">
        <div
          class="bg-primary flex size-fit items-center justify-center rounded-sm p-1.5"
        >
          <LucideMail :size="20" />
        </div>
        <h2 class="text-highlighted text-2xl font-bold">Requests</h2>
      </div>

      <!-- Requests List -->
      <ul class="flex max-h-full flex-col gap-4 pt-6">
        <li
          v-for="(request, index) in props.requests"
          :key="request.id"
          :style="{ transitionDelay: `${Math.floor(index / 2) * 150}ms` }"
        >
          <UiCardRequestSmall :request="request" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  contributors: ProjectDetailsClient['contributors'];
  requests: ProjectDetailsClient['requests'];
}
const props = defineProps<Props>();

const session = await authClient.getSession();

const requestsStore = useRequestsStore();
await requestsStore.fetch(session.data!.user.id);
</script>
