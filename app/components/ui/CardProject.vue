<template>
  <div
    class="card hover-lift flex size-full cursor-pointer flex-col justify-between gap-5 hover:shadow-xl"
  >
    <div>
      <div class="flex flex-row justify-between gap-6">
        <div>
          <!-- Project Tags -->
          <div class="mb-3.5 flex flex-row gap-3">
            <!-- Tag: Project Status -->
            <UiBadgeProjectStatus :status="props.project.status" />
            <!-- Tag: Total Contributors -->
            <UBadge
              :label="props.project.contributorsCount"
              icon="i-lucide-users"
              color="neutral"
              variant="subtle"
            />
            <!-- Tag: Total Requests -->
            <UBadge
              :label="props.project.requestsCount"
              icon="i-lucide-mail"
              color="neutral"
              variant="subtle"
            />
            <!-- Tag: Total Detectors -->
            <UBadge
              :label="props.project.detectorsCount"
              icon="i-lucide-radar"
              color="neutral"
              variant="subtle"
            />
          </div>

          <!-- Project Name -->
          <div class="flex flex-row items-center gap-4 pl-1">
            <UiChipProjectStatus :status="props.project.status" />
            <h1 class="text-highlighted text-2xl font-bold">
              {{ capitalizeFirstChar(props.project.name) }}
            </h1>
          </div>

          <!-- Project Description -->
          <p class="text-default mt-1.5 text-sm">
            {{ props.project.description }}
          </p>
        </div>
        <div class="flex flex-row gap-3">
          <!-- Button: Edit Project -->
          <UButton
            size="lg"
            class="size-fit"
            icon="i-lucide-square-pen"
            variant="subtle"
            color="neutral"
          />
          <!-- Button: Delete Project -->
          <UButton
            size="lg"
            class="size-fit"
            icon="i-lucide-trash-2"
            variant="soft"
            color="error"
            @click="
              deleteProjectWrapper(props.project.id, session.data!.user.id)
            "
          />
        </div>
      </div>

      <div class="mt-4 flex flex-row gap-10">
        <!-- Project Specie -->
        <div class="flex flex-row items-center gap-2">
          <IconsBat color="var(--color-primary)" />
          <p class="text-default italic">{{ props.project.specieName }}</p>
        </div>

        <!-- Project Location -->
        <div class="flex flex-row items-center gap-2">
          <LucideMapPin :size="18" class="!text-primary" />
          <p class="text-default">{{ props.project.locationLabel }}</p>
        </div>
      </div>
    </div>

    <div
      class="flex min-h-[37px] flex-row items-center justify-between gap-3 border-t-1 border-t-slate-300 pt-3"
    >
      <!-- Project Progress Indicator -->
      <UProgress
        color="primary"
        size="md"
        :model-value="
          progressBetweenDates(props.project.startDate, props.project.endDate)
        "
      />
      <!-- Project Remaining Time -->
      <UBadge
        v-if="props.project.status === 'in progress'"
        :label="timeRemaining(props.project.endDate)"
        color="neutral"
        variant="subtle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const session = await authClient.getSession();

const projectsStore = useProjectsStore();
const requestsStore = useRequestsStore();
const invitesStore = useInvitesStore();

const props = defineProps({
  project: {
    type: Object as PropType<ProjectClient>,
    required: true
  }
});

const deleteProjectWrapper = async (projectId: string, userId: string) => {
  await projectsStore.delete(projectId, userId);

  // Remove associated requests and invites from state
  requestsStore.removeByProjectId(projectId);
  invitesStore.removeByProjectId(projectId);
};
</script>
