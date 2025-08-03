<template>
  <ULink
    class="card hover-lift flex size-full cursor-pointer flex-col justify-between gap-4 hover:shadow-xl"
    :to="`/projects/${props.project.id}`"
  >
    <div class="flex flex-row items-start justify-between">
      <div class="flex flex-col gap-1">
        <div class="flex flex-row gap-3">
          <!-- Project Name -->
          <h2 class="text-highlighted text-lg font-bold">
            {{ props.project.name }}
          </h2>
          <!-- Project Status -->
          <div class="">
            <UiBadgeProjectStatus :status="props.project.status" />
          </div>
        </div>
        <div class="flex flex-row gap-8">
          <div class="flex flex-row items-center gap-1">
            <LucideBird :size="12" class="!text-muted" />
            <p class="text-muted text-xs">{{ props.project.specieName }}</p>
          </div>
          <div class="flex flex-row items-center gap-1">
            <LucideMapPin :size="12" class="!text-muted" />
            <p class="text-muted text-xs">
              {{ props.project.locationLabel }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-row gap-2">
        <!-- Button: Delete Project -->
        <UButton
          size="lg"
          icon="i-lucide-trash"
          color="neutral"
          variant="subtle"
          class="size-fit"
          aria-label="Delete the project"
          @click="deleteProjectWrapper"
        />
        <!-- Button: Edit Project -->
        <UButton
          size="lg"
          icon="i-lucide-square-pen"
          color="neutral"
          variant="subtle"
          aria-label="Go to project edit page"
          class="size-fit"
        />
      </div>
    </div>

    <!-- Project Description -->
    <p class="text-default w-full rounded-sm text-sm">
      {{ props.project.description }}
    </p>

    <!-- Project Progress -->
    <div class="flex flex-col gap-2">
      <div class="flex flex-row justify-between">
        <p class="text-default text-sm font-semibold">Progress</p>
        <p class="text-default text-sm font-semibold">
          {{
            Math.round(
              progressBetweenDates(
                props.project.startDate,
                props.project.endDate
              )
            )
          }}%
        </p>
      </div>
      <UProgress
        color="primary"
        :model-value="
          progressBetweenDates(props.project.startDate, props.project.endDate)
        "
      />
    </div>

    <div class="flex flex-row gap-15">
      <!-- Progress Detectors Count -->
      <div class="flex flex-row items-center gap-3">
        <div class="bg-primary-100 rounded-sm p-1.5">
          <LucideRadar :size="18" class="!text-primary" />
        </div>
        <div class="flex flex-col">
          <h3 class="text-default/80 text-xs">Detectors</h3>
          <p class="text-default font-bold">
            {{ props.project.detectorsCount }}
          </p>
        </div>
      </div>
      <!-- Progress Contributors Count -->
      <div class="flex flex-row items-center gap-3">
        <div class="bg-primary-100 rounded-sm p-1.5">
          <LucideUsers :size="18" class="!text-primary" />
        </div>
        <div class="flex flex-col">
          <h3 class="text-default/80 text-xs">Team</h3>
          <p class="text-default font-bold">
            {{ props.project.contributorsCount }}
          </p>
        </div>
      </div>
      <!-- Progress Requests Count -->
      <div class="flex flex-row items-center gap-3">
        <div class="bg-primary-100 rounded-sm p-1.5">
          <LucideMail :size="18" class="!text-primary" />
        </div>
        <div class="flex flex-col">
          <h3 class="text-default/80 text-xs">Requests</h3>
          <p class="text-default font-bold">
            {{ props.project.requestsCount }}
          </p>
        </div>
      </div>
      <!-- Progress Requests Count -->
      <!-- <div class="flex flex-row items-center gap-3"> -->
      <!--   <div class="bg-primary-100 rounded-sm p-1.5"> -->
      <!--     <LucideBird :size="18" class="!text-primary" /> -->
      <!--   </div> -->
      <!--   <div class="flex flex-col"> -->
      <!--     <h3 class="text-default/80 text-xs">Specie</h3> -->
      <!--     <p class="text-default text-sm font-bold"> -->
      <!--       {{ props.project.specieName }} -->
      <!--     </p> -->
      <!--   </div> -->
      <!-- </div> -->
    </div>

    <div
      class="flex flex-row justify-between border-t-1 border-t-slate-200 pt-3"
    >
      <!-- Project Last Update -->
      <div class="flex flex-row items-center gap-1">
        <LucideCalendar :size="12" class="!text-default" />
        <p class="text-default text-xs">
          Updated
          {{ timeSinceDate(dayjs(props.project.lastUpdate).toString()) }}
        </p>
      </div>
      <div class="flex flex-row items-center gap-1">
        <LucideLink :size="12" class="!text-default" />
        <p class="text-default text-xs">View Details</p>
      </div>
    </div>
  </ULink>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
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

const deleteProjectWrapper = async (event: Event) => {
  // Prevent card link to trigger on delete button click
  event.preventDefault();
  event.stopPropagation();

  await projectsStore.delete(props.project.id, session.data!.user.id);

  // Remove associated requests and invites from state
  requestsStore.removeByProjectId(props.project.id);
  invitesStore.removeByProjectId(props.project.id);
};
</script>
