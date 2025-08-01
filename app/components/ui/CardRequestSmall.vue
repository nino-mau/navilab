<template>
  <div
    class="card hover-lift flex size-full cursor-pointer flex-col justify-between gap-4 !border-0 !bg-white !p-4 hover:shadow-xl"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-row items-center justify-between">
        <!-- Request Heading -->
        <div class="flex flex-row items-center gap-3">
          <!-- User Avatar -->
          <UAvatar size="xl" class="rounded-md" :src="avatarUrl" />
          <div class="flex flex-col">
            <!-- Username -->
            <h1 class="text-highlighted text-lg font-semibold">
              {{ capitalizeFirstChar(request.requesterName) }}
            </h1>

            <!-- User Email -->
            <p class="text-default text-sm">{{ request.requesterEmail }}</p>
          </div>
        </div>

        <div class="flex flex-row gap-3">
          <!-- Button: Accept Request -->
          <UButton
            size="lg"
            variant="soft"
            color="success"
            icon="i-lucide-check"
          />
          <!-- Button: Refuse Request -->
          <UButton size="lg" variant="soft" color="error" icon="i-lucide-x" />
        </div>
      </div>

      <!-- Request Description -->
      <p class="rounded-md bg-slate-100 p-3 text-sm text-slate-600 italic">
        "{{ request.message }}"
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
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
