<template>
  <div class="relative flex h-full items-center justify-center">
    <!-- Button: Go back -->
    <UButton
      variant="subtle"
      color="neutral"
      size="xl"
      icon="i-lucide-arrow-left"
      label="Go Back"
      class="absolute top-5 left-5"
      aria-label="Go back to projects page"
      to="/projects"
    />

    <div class="flex flex-col gap-9">
      <!-- Heading -->
      <div class="flex flex-col items-center gap-2">
        <h1 class="grad-text-primary text-4xl font-bold">Create new project</h1>
        <p class="text-text text-2xl font-medium opacity-80">
          Lorem ipsum lorem ipsum lorem
        </p>
      </div>

      <div class="card w-[705px]">
        <!-- Form: Create Project -->
        <UForm
          :schema="createProjectSchema"
          :state="formValues"
          class="space-y-10"
          @submit="onFormSubmit"
        >
          <div class="flex flex-col gap-6">
            <!-- Field: Name -->
            <UFormField :required="false" name="name">
              <UInput
                v-model="formValues.name"
                placeholder=""
                type="text"
                class="w-full"
                size="xl"
                :ui="{ base: 'peer' }"
              >
                <label :class="floatingLabelStyle">
                  <span class="inline-flex bg-transparent px-1">Name</span>
                </label>
              </UInput>
            </UFormField>

            <!-- Field: Description -->
            <UFormField :required="false" name="description">
              <UTextarea
                v-model="formValues.description"
                placeholder=""
                type="text"
                class="w-full"
                size="xl"
                :ui="{ base: 'peer' }"
              >
                <label :class="floatingLabelStyle">
                  <span class="inline-flex bg-transparent px-1"
                    >Description</span
                  >
                </label>
              </UTextarea>
            </UFormField>

            <!-- Field: Specie -->
            <UFormField :required="false" name="specie">
              <USelectMenu
                v-model="formValues.specie"
                placeholder="Specie"
                :items="speciesOptions"
                :loading="isSpecieSelectLoading"
                class="w-full"
                size="xl"
                :ui="{ trailingIcon: 'mt-[3px]' }"
              />
            </UFormField>

            <!-- Field: Location Label -->
            <UFormField :required="false" name="locationLabel">
              <UInput
                v-model="formValues.locationLabel"
                placeholder=""
                type="text"
                class="w-full"
                size="xl"
                :ui="{ base: 'peer' }"
              >
                <label :class="floatingLabelStyle">
                  <span class="inline-flex bg-transparent px-1"
                    >Location name</span
                  >
                </label>
              </UInput>
            </UFormField>

            <!-- Field: Start Date -->
            <UFormField :required="false" name="startDate">
              <UInput
                v-model="formValues.startDate"
                v-maskito="dateMask"
                :placeholder="
                  startDateFocused || formValues.name ? 'yyyy-mm-dd' : ''
                "
                class="w-full"
                size="xl"
                :ui="{ base: 'peer', leading: 'ps-1' }"
                @focus="startDateFocused = true"
                @blur="startDateFocused = false"
              >
                <label :class="floatingLabelDatePickerStyle">Start Date</label>

                <template #leading>
                  <UPopover :content="{ align: 'start' }">
                    <UButton
                      variant="link"
                      size="xl"
                      icon="i-lucide-calendar"
                      color="neutral"
                      :ui="{
                        leadingIcon: '!text-dimmed hover:!text-slate-500'
                      }"
                    />
                    <template #content>
                      <UCalendar
                        v-model="calendarDateValues.start"
                        class="p-2"
                      />
                    </template>
                  </UPopover>
                </template>
              </UInput>
            </UFormField>

            <!-- Field: End Date -->
            <UFormField :required="false" name="endDate">
              <UInput
                v-model="formValues.endDate"
                v-maskito="dateMask"
                :placeholder="
                  endDateFocused || formValues.name ? 'yyyy-mm-dd' : ''
                "
                class="w-full"
                size="xl"
                :ui="{ base: 'peer', leading: 'ps-1' }"
                @focus="endDateFocused = true"
                @blur="endDateFocused = false"
              >
                <label :class="floatingLabelDatePickerStyle"> End Date </label>

                <template #leading>
                  <UPopover :content="{ align: 'start' }">
                    <UButton
                      variant="link"
                      size="xl"
                      icon="i-lucide-calendar"
                      color="neutral"
                      :ui="{
                        leadingIcon: '!text-dimmed hover:!text-slate-500'
                      }"
                    />
                    <template #content>
                      <UCalendar v-model="calendarDateValues.end" class="p-2" />
                    </template>
                  </UPopover>
                </template>
              </UInput>
            </UFormField>

            <!-- Field: is Private -->
            <USwitch
              v-model="formValues.private"
              size="xl"
              label="Private"
              description="Indicate if project is visible to all"
              color="primary"
            />
          </div>

          <!-- Button: Create Project -->
          <UButton
            type="submit"
            size="xl"
            class="w-full justify-center"
            label="Create"
            icon="i-lucide-plus"
            aria-label="Create project"
          />
        </UForm>
      </div>
      <!-- Form -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarDate, parseDate } from '@internationalized/date';
import type { FormSubmitEvent, SelectItem } from '@nuxt/ui';
import cn from 'cn-lib';
import z from 'zod';
import dateMask from '~/utils/date-mask';

const session = await authClient.getSession();

const toast = useToast();

// Control visibility of dates input placeholder
const endDateFocused = ref(false);
const startDateFocused = ref(false);

// Hold values of calendar end/start dates as opposed to input end/start dates
const calendarDateValues = shallowReactive<{
  start: CalendarDate | undefined;
  end: CalendarDate | undefined;
}>({
  start: new CalendarDate(2022, 1, 10),
  end: new CalendarDate(2022, 1, 10)
});

const speciesOptions = ref<SelectItem[]>([]);
const isSpecieSelectLoading = ref<boolean>(false);

const formValues = reactive<Partial<z.output<typeof createProjectSchema>>>({
  name: '',
  description: '',
  specie: undefined,
  locationLabel: '',
  startDate: '',
  endDate: '',
  private: false
});

// Form validation schema
const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(30, { message: 'Name must be no more than 30 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Name contains invalide characters'
    }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(150, { message: 'Description must be no more than 150 characters' }),
  specie: z.object(
    {
      value: z.string().min(1, { message: 'Specie is required' })
    },
    { error: 'Specie is required' }
  ),
  locationLabel: z
    .string()
    .min(3, { message: 'Label must be at least 3 characters' })
    .max(50, { message: 'Label must be no more than 50 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Label contains invalide characters'
    }),
  startDate: z.iso
    .date({ error: 'End date is required' })
    .min(1, { message: 'Start date is required' }),
  endDate: z.iso
    .date({ error: 'End date is required' })
    .min(1, { message: 'End date is required' }),
  private: z.boolean()
});

// Add floating label effect to inputs
const floatingLabelStyle = cn(
  'text-text2 peer-focus:text-text2 rounded-sm peer-placeholder-shown:text-dimmed peer-focus:bg-background-elevated',
  'pointer-events-none absolute -top-2.5 left-0 mx-2.5',
  'text-sm font-medium bg-default transition-all bg-background-elevated',
  'peer-placeholder-shown:top-[8px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-default peer-placeholder-shown:font-normal',
  'peer-focus:-top-2.5 peer-focus:text-sm peer-focus:font-medium'
);

// Custom styling for date inputs since they have leading icon
const floatingLabelDatePickerStyle = cn(
  'text-text2 peer-focus:text-text2 rounded-sm peer-placeholder-shown:text-dimmed peer-focus:bg-background-elevated',
  'pointer-events-none absolute -top-2.5 left-0 px-1 ml-3',
  'text-sm font-medium bg-default transition-all bg-background-elevated',
  'peer-placeholder-shown:top-[8px] peer-placeholder-shown:text-base peer-placeholder-shown:ml-9 peer-placeholder-shown:bg-default peer-placeholder-shown:font-normal',
  'peer-focus:-top-2.5 peer-focus:text-sm peer-focus:font-medium'
);

/**
 * Handle syncing input value and it's associated calendar date value
 */

watch(
  () => formValues.startDate,
  (val) => {
    if (['y', 'm', 'd'].some((char) => val?.includes(char))) return;
    console.log(val);
    calendarDateValues.start = val ? parseDate(val) : undefined;
    console.log(calendarDateValues);
  }
);
watch(
  () => formValues.endDate,
  (val) => {
    if (['y', 'm', 'd'].some((char) => val?.includes(char))) return;
    calendarDateValues.end = val ? parseDate(val) : undefined;
  }
);
watch(
  () => calendarDateValues.start,
  (val) => {
    console.log(val?.toString());
    formValues.startDate = val ? val.toString() : undefined;
  }
);
watch(
  () => calendarDateValues.end,
  (val) => {
    formValues.endDate = val ? val.toString() : undefined;
  }
);

/**
 * Call api to create detectors in database
 */
async function onFormSubmit(
  event: FormSubmitEvent<z.output<typeof createProjectSchema>>
) {
  const res = await $fetch.raw(`/api/users/${session.data?.user.id}/projects`, {
    method: 'POST',
    body: event.data
  });

  if (!res.ok) {
    toast.add({
      title: 'Error',
      description: 'Could not create project due to unexpected error',
      color: 'error',
      icon: 'i-lucide-circle-x'
    });
    return;
  }

  navigateTo('/projects');
  toast.add({
    title: 'Success',
    description: 'Successfully created new project',
    color: 'success',
    icon: 'i-lucide-circle-check'
  });
}

onMounted(async () => {
  try {
    isSpecieSelectLoading.value = true;
    const speciesData = await $fetch('/api/species', {
      method: 'GET'
    });
    speciesOptions.value = speciesData.map((specie) => {
      return { label: specie.name, value: specie.id };
    });
  } finally {
    isSpecieSelectLoading.value = false;
  }
});
</script>
