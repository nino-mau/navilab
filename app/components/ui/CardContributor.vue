<template>
  <div
    class="card hover-lift flex h-fit cursor-pointer flex-col gap-4 !p-4 hover:shadow-xl"
  >
    <div class="flex flex-row items-center justify-between">
      <div class="flex w-full flex-row gap-4">
        <UAvatar
          :chip="{
            color: 'success',
            position: 'bottom-right',
            inset: true,
            size: 'xl'
          }"
          :src="avatarUrl"
          size="3xl"
          class="rounded-sm"
        />

        <div class="flex w-full flex-col">
          <!-- Contributor Name -->
          <h2 class="text-highlighted text-xl.n.name font-bold">
            {{ capitalizeFirstChar(props.contributor.name) }}
          </h2>

          <!-- Contributor Email -->
          <p class="text-default max-w-[95%] truncate">
            {{ props.contributor.email }}
          </p>
        </div>
      </div>

      <!-- Button: Revoke Access -->
      <UButton
        size="lg"
        class="size-fit"
        color="neutral"
        icon="i-lucide-ellipsis"
        variant="subtle"
      />
    </div>
    <div
      class="flex flex-row justify-between border-t-1 border-t-slate-300 pt-3.5"
    >
      <!-- Contributor Total Contributions -->
      <UBadge label="0 Contributions" color="neutral" variant="subtle" />

      <!-- Contributor Total Detectors -->
      <UBadge
        :label="`${detectorsCount} ${detectorsCount === 1 ? 'Detector' : 'Detectors'}`"
        icon="i-lucide-radar"
        color="primary"
        variant="solid"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  contributor: ProjectDetailsClient['contributors'][0];
}
const props = defineProps<Props>();

const rc = useRuntimeConfig();

const projectStore = useProjectStore();

const detectorsCount = projectStore.getContributorDetectorsCount(
  props.contributor.id
);

const avatarUrl =
  rc.public.avatarPlaceholderUrl + `&seed=${props.contributor.name}`;
</script>
