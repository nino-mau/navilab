<template>
  <div
    class="bg-primary-500 flex h-[65px] min-h-[65px] flex-row justify-between px-6"
  >
    <!-- Site Title -->
    <div class="flex flex-row items-center">
      <IconsSite />

      <h2 class="ml-3 text-2xl font-bold text-white">NAVILAB</h2>
    </div>

    <!-- LoggedIn Menu -->
    <div v-if="session.data" class="flex flex-row items-center gap-5">
      <!-- Button: Settings -->
      <LucideSettings :size="24" />
      <!-- Button: Notifications -->
      <LucideBell :size="24" />
      <div class="flex items-center gap-2.5">
        <p class="text-white">{{ username }}</p>
        <!-- DropdownMenu: User Profile -->
        <UDropdownMenu
          :items="profileDropdownMenuItems"
          :ui="{
            content: 'w-48'
          }"
        >
          <template #default="{ open }">
            <UAvatar
              size="xl"
              :src="avatarUrl"
              :alt="username.toUpperCase()"
              class="cursor-pointer hover:ring-4 hover:ring-white/10"
              :class="{ 'ring-3 ring-black/10': open }"
            />
          </template>
        </UDropdownMenu>
      </div>
    </div>

    <!-- LoggedOut Menu  -->
    <div v-else class="flex flex-row items-center gap-4">
      <!-- Button: Login -->
      <UButton
        label="Login"
        size="xl"
        variant="ghost"
        color="neutral"
        class="text-white hover:bg-white/10"
        to="/login"
      />
      <!-- Button: Sign Up -->
      <UButton
        size="xl"
        class="font-semibold"
        label="Sign up"
        color="secondary"
        to="/register"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const session = await authClient.getSession();

const rc = useRuntimeConfig();

const username = ref<string>(upperFirst(session.data?.user?.name || ''));

const avatarUrl =
  rc.public.avatarPlaceholderUrl + `&seed=${session.data?.user?.name}`;

const profileDropdownMenuItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: username.value,
      avatar: {
        src: avatarUrl
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      ui: {
        itemLeadingIcon: '!text-dimmed hover:!text-dimmed',
        item: 'hover:bg-gray-100'
      },
      async onSelect() {
        await authClient.signOut();
        navigateTo('/login');
      }
    }
  ]
]);
</script>
