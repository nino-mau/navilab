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
          Manage Your Detectors
        </h1>
        <p>Monitor and manage your detection devices</p>
      </div>
      <!-- Button: Create Detector -->
      <UButton
        variant="solid"
        size="xl"
        color="primary"
        label="Create
          Detector"
        icon="i-lucide-plus"
        class="h-fit"
        to="/detectors/create"
      />
    </div>

    <!-- Overview Section -->
    <div class="grid h-[140px] grid-cols-4 gap-6">
      <!-- Card: Total Detectors -->
      <div
        class="hover-lift bg-elevated border-accented col-span-1 flex flex-col justify-between rounded-md border-1 p-6 shadow-md"
      >
        <div class="text-text2 flex flex-row items-center gap-2">
          <LucideSettings :size="16" class="!text-inherit" />
          <p class="text-sm font-medium text-inherit">Total Detectors</p>
        </div>
        <div>
          <p class="text-text text-4xl font-bold">
            {{ detectorStore.detectors.length }}
          </p>
          <p class="text-text2 text-xs">Active devices</p>
        </div>
      </div>

      <!-- Card: Online Detectors -->
      <div
        class="hover-lift col-span-1 flex flex-col justify-between rounded-md border-1 border-green-600/30 bg-gradient-to-br from-green-50 to-green-100/50 p-6 shadow-md"
      >
        <div class="flex flex-row items-center gap-2 text-green-600">
          <LucideWifi :size="16" class="!text-inherit" />
          <p class="text-sm font-medium text-inherit">Online</p>
        </div>
        <div>
          <p class="text-4xl font-bold text-green-600">4</p>
          <p class="text-xs text-green-600">Connected now</p>
        </div>
      </div>

      <!-- Card: Offline Detectors -->
      <div
        class="hover-lift col-span-1 flex flex-col justify-between rounded-md border-1 border-red-600/30 bg-gradient-to-br from-red-50 to-red-100/50 p-6 shadow-md"
      >
        <div class="flex flex-row items-center gap-2 text-red-600">
          <LucideWifiOff :size="16" class="!text-inherit" />
          <p class="text-sm font-medium text-inherit">Offline</p>
        </div>
        <div>
          <p class="text-4xl font-bold text-red-600">4</p>
          <p class="text-xs text-red-600">Disconnected</p>
        </div>
      </div>

      <!-- Card: Inactive Detectors  -->
      <div
        class="hover-lift col-span-1 flex flex-col justify-between rounded-md border-1 border-amber-600/30 bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 shadow-md duration-200"
      >
        <div class="flex flex-row items-center gap-2 text-amber-600">
          <LucideWifiCog :size="16" class="!text-inherit" />
          <p class="text-sm font-medium text-inherit">Inactive</p>
        </div>
        <div>
          <p class="text-4xl font-bold text-amber-600">4</p>
          <p class="text-xs text-amber-600">Inactive now</p>
        </div>
      </div>
    </div>

    <div class="card flex flex-row items-center gap-2 bg-white p-4">
      <LucideTable :size="30" class="!text-highlighted" />
      <h2 class="text-highlighted text-2xl font-bold">Detectors Registry</h2>
    </div>

    <!-- Detectors Table -->
    <div class="card h-fit w-full bg-white p-0">
      <UTable
        :data="detectorsTableData"
        :columns="detectorsTableColumns"
        :loading="detectorsTableLoading"
        class="flex-1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import dayjs from 'dayjs';
import type { DetectorStatus, DetectorType } from '~~/shared/types/detector';

type DetectorsTable = {
  deviceName: string;
  type: DetectorType;
  status: DetectorStatus;
  lastData: string;
  project: string;
};

const session = await authClient.getSession();
const detectorStore = useDetectorsStore();

const UButton = resolveComponent('UButton');
const UBadge = resolveComponent('UBadge');
const UChip = resolveComponent('UChip');

const detectorsTableLoading = ref<boolean>(false);

const detectorsTableData = ref<DetectorsTable[]>([]);

const detectorsTableColumns: TableColumn<DetectorsTable>[] = [
  {
    accessorKey: 'deviceName',
    header: 'Device Name',
    cell({ row }) {
      const colorMap = {
        online: 'success',
        offline: 'error',
        inactive: 'neutral'
      };
      return h('div', { class: 'flex flex-row justify-start gap-2' }, [
        h(UChip, {
          color: colorMap[row.getValue('status') as DetectorStatus],
          standalone: true,
          inset: true
        }),
        h(
          'p',
          { class: 'font-semibold !text-default text-sm' },
          row.getValue('deviceName')
        )
      ]);
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        online: 'success' as const,
        offline: 'error' as const,
        inactive: 'neutral' as const
      }[row.getValue('status') as string];

      const icon = {
        online: 'i-lucide-wifi' as const,
        offline: 'i-lucide-wifi-off' as const,
        inactive: 'i-lucide-wifi-cog' as const
      }[row.getValue('status') as string];

      return h(
        UBadge,
        { class: 'capitalize', size: 'md', icon, variant: 'subtle', color },
        () => row.getValue('status')
      );
    }
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell({ row }) {
      return h('p', { class: ' text-sm' }, row.getValue('type'));
    }
  },
  {
    accessorKey: 'project',
    header: 'Project'
  },
  {
    accessorKey: 'lastData',
    header: 'Last Data',
    cell: ({ row }) => {
      return h(
        UBadge,
        {
          class: 'capitalize',
          size: 'md',
          variant: 'subtle',
          color: 'neutral'
        },
        () => timeSinceDate(row.getValue('lastData'))
      );
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    meta: {
      class: {
        th: 'text-center'
      }
    },
    cell: () => {
      return h('div', { class: 'flex flex-row justify-center gap-3' }, [
        h(UButton, {
          icon: 'i-lucide-trash-2',
          color: 'error',
          variant: 'ghost'
        }),
        h(UButton, {
          icon: 'i-lucide-square-pen',
          color: 'neutral',
          variant: 'ghost'
        })
      ]);
    }
  }
];

onMounted(async () => {
  try {
    detectorsTableLoading.value = true;
    await detectorStore.fetch(session.data.user.id);

    // Adapt detectors data for the table data struct
    detectorsTableData.value = detectorStore.detectors.map((detector) => {
      return {
        deviceName: detector.name,
        type: detector.type,
        status: 'offline',
        lastData: dayjs().format(),
        project: 'No Project'
      } as DetectorsTable;
    });
  } finally {
    detectorsTableLoading.value = false;
  }
});
</script>
