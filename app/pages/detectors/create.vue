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
      aria-label="Go back to detectors page"
      to="/detectors"
    />

    <div class="flex flex-col gap-9">
      <div class="flex flex-col items-center gap-2">
        <!-- Heading -->
        <h1 class="grad-text-primary text-4xl font-bold">
          Create new detector
        </h1>
        <p class="text-text text-2xl font-medium opacity-80">
          Lorem ipsum lorem ipsum lorem
        </p>
      </div>

      <div class="card w-[705px]">
        <UForm
          :schema="createDetectorSchema"
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

            <!-- Field: Type -->
            <UFormField :required="false" name="type">
              <USelect
                v-model="formValues.type"
                placeholder="Type"
                :items="
                  DETECTOR_TYPES.map((type) => ({ label: type, value: type }))
                "
                class="w-full"
                size="xl"
                :ui="{ trailingIcon: 'mt-[3px]' }"
              />
            </UFormField>

            <!-- Field: Serial Number -->
            <UFormField :required="false" name="serialNumber">
              <UInput
                v-model="formValues.serialNumber"
                placeholder=""
                type="text"
                class="w-full"
                size="xl"
                :ui="{ base: 'peer' }"
              >
                <label :class="floatingLabelStyle">
                  <span class="inline-flex bg-transparent px-1"
                    >Serial number</span
                  >
                </label>
              </UInput>
            </UFormField>

            <!-- Field: Password -->
            <UFormField name="password">
              <UInput
                v-model="formValues.password"
                placeholder=""
                :type="showPassword ? 'text' : 'password'"
                class="w-full"
                size="xl"
                :ui="{ base: 'peer', trailing: 'pe-1.5' }"
              >
                <label :class="floatingLabelStyle">
                  <span class="inline-flex bg-transparent px-1">Password</span>
                </label>

                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="md"
                    class="text-dimmed"
                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="
                      showPassword ? 'Hide password' : 'Show password'
                    "
                    :aria-pressed="showPassword"
                    aria-controls="password"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </UInput>
            </UFormField>

            <!-- Field: Confirm Password -->
            <UFormField name="confirmPassword">
              <UInput
                v-model="formValues.confirmPassword"
                placeholder=""
                :type="showConfirmPassword ? 'text' : 'password'"
                class="w-full"
                size="xl"
                :ui="{ base: 'peer', trailing: 'pe-1.5' }"
              >
                <label :class="floatingLabelStyle">
                  <span class="inline-flex bg-transparent px-1"
                    >Confirm password</span
                  >
                </label>

                <template #trailing>
                  <UButton
                    color="neutral"
                    class="text-dimmed"
                    variant="link"
                    size="md"
                    :icon="
                      showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'
                    "
                    :aria-label="
                      showConfirmPassword
                        ? 'Hide Confirm password'
                        : 'Show Confirm password'
                    "
                    :aria-pressed="showConfirmPassword"
                    aria-controls="password"
                    @click="showConfirmPassword = !showConfirmPassword"
                  />
                </template>
              </UInput>
            </UFormField>
          </div>

          <!-- Button: Create Detector -->
          <UButton
            type="submit"
            size="xl"
            class="w-full justify-center"
            label="Create"
            icon="i-lucide-plus"
            aria-label="Create detector"
          />
        </UForm>
      </div>
      <!-- Form -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import cn from 'cn-lib';
import z from 'zod';

const session = await authClient.getSession();

const toast = useToast();

// Form validation schema
const createDetectorSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters' })
      .max(30, { message: 'Name must be no more than 30 characters' })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Name contains invalide characters'
      }),
    serialNumber: z.string().min(1, { message: 'Serial number is required' }),
    type: z.enum(DETECTOR_TYPES, { error: 'Type is required' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword']
  });

const formValues = reactive<Partial<z.output<typeof createDetectorSchema>>>({
  name: '',
  serialNumber: '',
  type: undefined,
  password: '',
  confirmPassword: ''
});

const showPassword = ref<boolean>(false);
const showConfirmPassword = ref<boolean>(false);

const floatingLabelStyle = cn(
  'text-text2 peer-focus:text-text2 rounded-sm peer-placeholder-shown:text-dimmed peer-focus:bg-background-elevated',
  'pointer-events-none absolute -top-2.5 left-0 mx-2.5',
  'text-sm font-medium bg-default transition-all bg-background-elevated',
  'peer-placeholder-shown:top-[8px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-default peer-placeholder-shown:font-normal',
  'peer-focus:-top-2.5 peer-focus:text-sm peer-focus:font-medium'
);

// Call api to create detectors in database
async function onFormSubmit(
  event: FormSubmitEvent<z.output<typeof createDetectorSchema>>
) {
  const res = await $fetch.raw(
    `/api/users/${session.data?.user.id}/detectors`,
    {
      method: 'POST',
      body: event.data
    }
  );

  if (!res.ok) {
    toast.add({
      title: 'Error',
      description: 'Could not create detector due to unexpected error',
      color: 'error',
      icon: 'i-lucide-circle-x'
    });
    return;
  }

  navigateTo('/detectors');
  toast.add({
    title: 'Success',
    description: 'Successfully created new detector',
    color: 'success',
    icon: 'i-lucide-circle-check'
  });
}
</script>
