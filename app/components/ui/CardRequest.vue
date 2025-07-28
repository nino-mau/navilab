<template>
  <div
    class="card hover-lift flex size-full cursor-pointer flex-col justify-between gap-4 hover:shadow-xl"
  >
    <div class="flex flex-row items-start justify-between">
      <!-- Request Heading -->
      <div class="flex flex-row items-center gap-3">
        <!-- User Avatar -->
        <UAvatar size="xl" class="rounded-md" :src="avatarUrl" />
        <div class="flex flex-col">
          <!-- Username -->
          <h1 class="text-highlighted text-lg font-semibold">
            {{ capitalizeFirstLetter(request.requesterName) }}
          </h1>

          <!-- User Email -->
          <p class="text-default text-sm">{{ request.requesterEmail }}</p>
        </div>
      </div>
      <div class="flex flex-row gap-3">
        <UBadge
          icon="i-lucide-layers"
          variant="subtle"
          size="md"
          :label="request.projectName"
          class="w-fit"
        />
        <!-- Time Since Request -->
        <UBadge
          :label="timeSinceDate(props.request.createdAt)"
          color="neutral"
          variant="subtle"
        />
      </div>
    </div>

    <!-- Request Description -->
    <p class="rounded-md bg-slate-200 p-3 text-sm text-slate-600 italic">
      "{{ request.message }}"
    </p>

    <div class="flex flex-row gap-4">
      <!-- Button: Accept Request -->
      <UButton
        size="lg"
        variant="subtle"
        color="success"
        icon="i-lucide-user-plus"
        label="Accept"
      />
      <!-- Button: Refuse Request -->
      <UButton
        size="lg"
        variant="subtle"
        color="error"
        icon="i-lucide-x"
        label="Refuse"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { capitalizeFirstLetter } from 'better-auth';

const props = defineProps({
  request: {
    type: Object as PropType<RequestClient>,
    required: true
  }
});

const rc = useRuntimeConfig();

const avatarUrl =
  rc.public.avatarPlaceholderUrl + `&seed=${props.request.requesterName}`;
</script>
