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

    <div
      class="bg-background-elevated card-border-top-primary flex w-[500px] flex-col gap-10 rounded-md p-6 pt-12 shadow-md"
    >
      <!-- Form Title -->
      <div class="flex flex-col items-center gap-2">
        <IconsSite color="var(--color-primary)" />
        <h1 class="!text-text2 text-center text-xl font-medium">
          Sign in to Navilab
        </h1>
      </div>

      <!-- Form -->
      <UForm
        :schema="loginSchema"
        :state="formValues"
        class="space-y-6"
        @submit="onFormSubmit"
      >
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

        <div class="flex flex-col gap-3.5">
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

          <div class="flex flex-row items-center justify-between">
            <!-- Field: Remember Me Checkbox -->
            <UCheckbox
              v-model="formValues.rememberMe"
              :ui="{ label: '!text-text2' }"
              size="xl"
              name="rememberMe"
              label="Remember me"
            />

            <!-- Link: Forgot Password -->
            <ULink class="text-primary hover:text-primary-600 font-medium">
              Forgot Password?
            </ULink>
          </div>
        </div>
        <UButton type="submit" size="xl" class="block w-full" label="Login" />
      </UForm>
    </div>
    <p class="text-text z-10 items-center">
      Don't have an account?
      <ULink
        to="/register"
        class="text-primary hover:text-primary-600 font-semibold"
      >
        Sign up
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
const loginSchema = z.object({
  email: z.email().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  rememberMe: z.boolean()
});

const formValues = reactive<Partial<z.output<typeof loginSchema>>>({
  email: '',
  password: '',
  rememberMe: false
});

const showPassword = ref<boolean>(false);
const emailFieldError = ref<string | undefined>(undefined);

const floatingLabelStyle = cn(
  'text-text2 peer-focus:text-text2 rounded-sm peer-placeholder-shown:text-dimmed peer-focus:bg-background-elevated',
  'pointer-events-none absolute -top-2.5 left-0 mx-2.5',
  'text-sm font-medium bg-default transition-all bg-background-elevated',
  'peer-placeholder-shown:top-[8px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-default peer-placeholder-shown:font-normal',
  'peer-focus:-top-2.5 peer-focus:text-sm peer-focus:font-medium'
);

async function onFormSubmit(
  event: FormSubmitEvent<z.output<typeof loginSchema>>
) {
  // Sign in user using better auth
  const { data, error } = await authClient.signIn.email({
    email: event.data.email,
    password: event.data.password,
    rememberMe: event.data.rememberMe
  });

  if (error) {
    if (error.code === 'INVALID_EMAIL_OR_PASSWORD') {
      const invalidEmail = event.data.email;
      emailFieldError.value = 'Email or password invalid';

      // Remove the error when the input value doesn't match the invalid email
      watch(
        () => formValues.email,
        (newValue) => {
          if (newValue !== invalidEmail) {
            emailFieldError.value = undefined;
          } else if (newValue === invalidEmail) {
            emailFieldError.value = 'Email or password invalid';
          }
        }
      );
    } else {
      console.log(data, error);
      toast.add({
        title: 'Error',
        description: 'Login failed due to unexpected error',
        color: 'error',
        icon: 'i-lucide-circle-x'
      });
    }
    return;
  }

  navigateTo('/');
  toast.add({
    title: 'Success',
    description: 'You successfully signed in to your account',
    color: 'success',
    icon: 'i-lucide-circle-check'
  });
}
</script>
