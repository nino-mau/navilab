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
          loading="lazy"
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

      <!-- Button: Open Contributor Menu -->
      <UDropdownMenu :items="dropdownMenuItems">
        <UButton
          size="lg"
          class="size-fit"
          color="neutral"
          icon="i-lucide-ellipsis"
          variant="subtle"
          aria-label="Open contributor dropdown menu"
        />
      </UDropdownMenu>
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
import type { DropdownMenuItem } from '@nuxt/ui';

interface Props {
  contributor: ProjectDetailsClient['contributors'][0];
}
const props = defineProps<Props>();

const project = useProjectStore();
const detectorsCount = project.getContributorDetectorsCount(
  props.contributor.id
);

const session = await authClient.getSession();

const rc = useRuntimeConfig();

const avatarUrl =
  rc.public.avatarPlaceholderUrl + `&seed=${props.contributor.name}`;

const dropdownMenuItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Revoke Access',
      icon: 'i-lucide-ban',
      ui: {
        itemLeadingIcon: '!text-dimmed hover:!text-dimmed',
        item: 'hover:bg-gray-100'
      },
      async onSelect() {
        project.removeContributor(
          props.contributor.id,
          project.project!.id,
          session.data!.user.id
        );
      }
    }
  ]
]);
</script>
