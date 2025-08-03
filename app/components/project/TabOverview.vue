<template>
  <div class="mt-4 flex size-full flex-col gap-6">
    <div class="grid grid-cols-4 gap-6">
      <!-- Card: Total Contacts -->
      <div
        class="card col-span-1 flex h-fit flex-col items-center justify-center"
      >
        <LucideRadio :size="32" class="!text-primary" />
        <h2 class="text-highlighted mt-3 text-2xl font-bold">20</h2>
        <p class="text-default text-sm">Contacts</p>
        <p class="text-success mt-1 text-xs font-medium">+12%</p>
      </div>

      <!-- Card: Covered Area -->
      <div
        class="card col-span-1 flex h-fit flex-col items-center justify-center"
      >
        <LucideLandPlot :size="32" class="!text-primary" />
        <h2 class="text-highlighted mt-3 text-2xl font-bold">35%</h2>
        <p class="text-default text-sm">Coverage</p>
        <p class="text-success mt-1 text-xs font-medium">+7%</p>
      </div>

      <!-- Card: Active Detectors -->
      <div
        class="card col-span-1 flex h-fit flex-col items-center justify-center"
      >
        <LucideRadar :size="32" class="!text-primary" />
        <h2 class="text-highlighted mt-3 text-2xl font-bold">
          {{ props.activeDetectorsCount }}
        </h2>
        <p class="text-default text-sm">Active Detectors</p>
        <p class="text-success mt-1 text-xs font-medium">
          {{ props.detectorsCount - props.activeDetectorsCount }} inactive
        </p>
      </div>

      <!-- Card: Project Completion -->
      <div
        class="card col-span-1 flex h-fit flex-col items-center justify-center py-[34px]"
      >
        <LucideChartNoAxesCombined :size="32" class="!text-primary" />
        <h2 class="text-highlighted mt-3 text-2xl font-bold">
          {{
            Math.round(
              progressBetweenDates(
                props.project.startDate,
                props.project.endDate
              )
            )
          }}%
        </h2>
        <p class="text-default text-sm">Project Completion</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <div class="col-span-1"></div>
      <div class="col-span-1 flex flex-col gap-6">
        <!-- Card: System Status -->
        <div class="card flex flex-col">
          <div class="mb-6 flex flex-row items-center gap-3">
            <LucideActivity class="!text-primary" />
            <h2 class="text-highlighted text-2xl font-bold">System Status</h2>
          </div>
          <div class="flex flex-col gap-3">
            <!-- Active Contributors Count -->
            <div class="flex flex-row justify-between">
              <p class="text-default">Active Contributors</p>
              <div class="flex flex-row items-center gap-2">
                <p class="text-success font-semibold">
                  {{ props.activeContributorsCount }}/{{
                    props.contributorsCount
                  }}
                </p>
                <UProgress :model-value="50" class="w-25" color="success" />
              </div>
            </div>

            <!-- Active Detectors -->
            <div class="flex flex-row justify-between">
              <p class="text-default">Active Detectors</p>
              <div class="flex flex-row items-center gap-2">
                <p class="text-success font-semibold">
                  {{ props.activeDetectorsCount }}/{{ props.detectorsCount }}
                </p>
                <UProgress :model-value="90" class="w-25" color="success" />
              </div>
            </div>

            <!-- Zone Coverage -->
            <div class="flex flex-row justify-between">
              <p class="text-default">Zone Coverage</p>
              <div class="flex flex-row items-center gap-2">
                <p class="text-dimmed font-semibold">0/12</p>
                <UProgress :model-value="0" class="w-25" />
              </div>
            </div>

            <!-- Project Last Update -->
            <div class="flex flex-row justify-between">
              <p class="text-default">Last Update</p>
              <p class="text-highlighted font-semibold">
                {{ timeSinceDate(props.project.lastUpdate) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Card: Project Details -->
        <div class="card flex flex-col">
          <div class="mb-6 flex flex-row items-center gap-3">
            <LucideFolderKanban class="!text-primary" />
            <h2 class="text-highlighted text-2xl font-bold">Project Details</h2>
          </div>
          <div class="flex flex-col gap-3">
            <!-- Project Manager -->
            <div class="flex flex-row justify-between">
              <p class="text-default">Manager</p>
              <UBadge
                :label="props.project.managerEmail"
                color="neutral"
                class="font-semibold"
                variant="subtle"
              />
            </div>
            <!-- Project Status -->
            <div class="flex flex-row justify-between">
              <p class="text-default">Project Status</p>
              <UiBadgeProjectStatus :status="props.project.status" />
            </div>
            <!-- Project Remaining Time -->
            <div class="flex flex-row justify-between">
              <p class="text-default">Remaining Time</p>
              <p class="text-highlighted font-semibold">
                {{ timeRemaining(props.project.endDate) }}
              </p>
            </div>
            <!-- Project Created Date -->
            <div class="flex flex-row justify-between">
              <p class="text-default">Created</p>
              <NuxtTime
                :datetime="props.project.startDate"
                date-style="long"
                class="text-highlighted font-semibold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  project: ProjectDetailsClient;
  detectorsCount: number;
  contributorsCount: number;
  activeDetectorsCount: number;
  activeContributorsCount: number;
}

const props = defineProps<Props>();
</script>
