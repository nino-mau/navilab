<template>
  <div
    class="relative flex size-full flex-col items-center justify-center gap-5"
  >
    <!-- Button: Go Home -->
    <UButton
      variant="link"
      to="/"
      class="absolute top-2 left-2 flex flex-row items-center gap-1"
      aria-label="Go to home page"
    >
      <IconsSite color="var(--color-text)" class="scale-[70%]" />
      <h2 class="text-text text-lg font-semibold" aria-hidden="true">
        NAVILAB
      </h2>
    </UButton>

    <!-- Modal: Register Success -->
    <UModal v-model:open="isRegisterSuccessModalOpen">
      <template #content>
        <div
          class="card-border-top-success flex flex-col items-center justify-center gap-4 px-5 pt-13 pb-5"
        >
          <div
            class="bg-success mb-2 flex size-15 items-center justify-center rounded-md"
          >
            <LucideCheckCheck :size="30" />
          </div>

          <h1 class="!text-text text-xl font-semibold">
            Account successfully created
          </h1>

          <p class="!text-text text-center">
            Hi
            <span class="text-primary font-bold">{{ formValues.username }}</span
            >. You're now able to join projects, add detectors and use all of
            our features.
          </p>

          <UButton
            class="mt-5 w-full justify-center"
            size="xl"
            color="success"
            label="Continue"
            icon="i-lucide-arrow-right"
            @click="
              toggleRegisterSuccessModal();
              navigateTo('/');
            "
          />
        </div>
      </template>
    </UModal>

    <div
      class="bg-background-elevated card-border-top-primary flex w-[500px] flex-col gap-10 rounded-md p-6 pt-12 shadow-md"
    >
      <!-- Form Title -->
      <div class="flex flex-col items-center">
        <IconsSite :width="40" :height="40" color="var(--color-primary)" />
        <h1 class="!text-text2 text-center text-xl font-medium">
          Sign up to Navilab
        </h1>
      </div>

      <!-- Form -->
      <UForm
        :schema="registerSchema"
        :state="formValues"
        class="space-y-6"
        @submit="onFormSubmit"
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
        <UFormField :required="false" name="email" :error="emailFieldError">
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

    <p class="text-text z-10 items-center">
      Already have an account?
      <ULink
        to="/login"
        class="text-primary hover:text-primary-600 font-semibold"
      >
        Sign in
      </ULink>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import cn from 'cn-lib';
import * as z from 'zod';
import { authClient } from '~/utils/auth-client';

definePageMeta({
  layout: 'blank'
});

const toast = useToast();

// Form validation schema
const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters' })
      .max(30, { message: 'Username must be no more than 30 characters' })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Username contains invalide characters'
      }),
    email: z
      .email({ message: 'Invalid email format' })
      .min(1, { message: 'Email is required' }),
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

const formValues = reactive<Partial<z.output<typeof registerSchema>>>({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const showPassword = ref<boolean>(false);
const showConfirmPassowrd = ref<boolean>(false);
const emailFieldError = ref<string | undefined>(undefined);
const isRegisterSuccessModalOpen = ref<boolean>(false);

const floatingLabelStyle = cn(
  'text-text2 peer-focus:text-text2 rounded-sm peer-placeholder-shown:text-dimmed peer-focus:bg-background-elevated',
  'pointer-events-none absolute -top-2.5 left-0 mx-2.5',
  'text-sm font-medium bg-default transition-all bg-background-elevated',
  'peer-placeholder-shown:top-[8px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-default peer-placeholder-shown:font-normal',
  'peer-focus:-top-2.5 peer-focus:text-sm peer-focus:font-medium'
);

const toggleRegisterSuccessModal = () => {
  isRegisterSuccessModalOpen.value = !isRegisterSuccessModalOpen.value;
};

async function onFormSubmit(
  event: FormSubmitEvent<z.output<typeof registerSchema>>
) {
  // Sign up user using better auth
  const { data, error } = await authClient.signUp.email({
    name: event.data.username,
    email: event.data.email,
    password: event.data.password
  });

  if (error) {
    if (error.code === 'USER_ALREADY_EXISTS') {
      const invalidEmail = event.data.email;
      emailFieldError.value = 'User already exist';

      // Remove the error when the input value doesn't match the invalid email
      watch(
        () => formValues.email,
        (newValue) => {
          if (newValue !== invalidEmail) {
            emailFieldError.value = undefined;
          } else if (newValue === invalidEmail) {
            emailFieldError.value = 'User already exist';
          }
        }
      );
    } else {
      console.log(data, error);
      toast.add({
        title: 'Error',
        description: 'Register failed due to unexpected error',
        color: 'error',
        icon: 'i-lucide-circle-x'
      });
    }
    return;
  }

  toggleRegisterSuccessModal();
}
</script>
