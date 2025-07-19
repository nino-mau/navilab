<template>
  <div class="flex size-full items-center justify-center">
    <div
      class="bg-background-elevated card-border-top-primary flex w-[500px] flex-col gap-10 rounded-md p-6 pt-8 shadow-md"
    >
      <!-- Form Title -->
      <h1 class="!text-text2 text-center text-4xl font-semibold">Register</h1>

      <!-- Form -->
      <UForm
        :schema="registerSchema"
        :state="formValues"
        :validate-on="['input']"
        class="space-y-6"
        @submit="onSubmit"
      >
        <!-- Field: Username -->
        <UFormField name="username">
          <UInput
            v-model="formValues.username"
            placeholder=""
            type="text"
            class="w-full"
            size="xl"
            :ui="{ base: 'peer' }"
          >
            <label :class="floatingLabelStyle">
              <span class="inline-flex bg-transparent px-1">Username</span>
            </label>
          </UInput>
        </UFormField>

        <!-- Field: Email -->
        <UFormField :required="false" name="email">
          <UInput
            v-model="formValues.email"
            placeholder=""
            type="email"
            class="w-full"
            size="xl"
            :ui="{ base: 'peer' }"
          >
            <label :class="floatingLabelStyle">
              <span class="inline-flex bg-transparent px-1">Email address</span>
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
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
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
            :type="showConfirmPassowrd ? 'text' : 'password'"
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
                variant="link"
                size="md"
                :icon="
                  showConfirmPassowrd ? 'i-lucide-eye-off' : 'i-lucide-eye'
                "
                :aria-label="
                  showConfirmPassowrd ? 'Hide password' : 'Show password'
                "
                :aria-pressed="showConfirmPassowrd"
                aria-controls="password"
                @click="showConfirmPassowrd = !showConfirmPassowrd"
              />
            </template>
          </UInput>
        </UFormField>

        <UButton
          type="submit"
          size="xl"
          class="block w-full"
          label="Register"
        />
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import cn from 'cn-lib';
import * as z from 'zod';

definePageMeta({
  layout: 'blank',
});

const toast = useToast();

interface FormValues {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

// Form validation schema
const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters' })
      .max(30, { message: 'Username must be no more than 30 characters' })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Username contains invalide characters',
      }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

const formValues = reactive<Partial<z.output<typeof registerSchema>>>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const showPassword = ref<boolean>(false);
const showConfirmPassowrd = ref<boolean>(false);

const floatingLabelStyle = cn(
  'text-text2 peer-focus:text-text2 rounded-sm peer-placeholder-shown:text-dimmed peer-focus:bg-background-elevated',
  'pointer-events-none absolute -top-2.5 left-0 mx-2.5',
  'text-sm font-medium bg-default transition-all bg-background-elevated',
  'peer-placeholder-shown:top-[8px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-default peer-placeholder-shown:font-normal',
  'peer-focus:-top-2.5 peer-focus:text-sm peer-focus:font-medium'
);

async function onSubmit(event: FormSubmitEvent<FormValues>) {
  toast.add({
    title: 'Success',
    description: 'The form has been submitted.',
    color: 'success',
  });
  console.log(event.data);
}
</script>
