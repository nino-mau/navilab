<template>
  <div class="bg-primary-500 flex h-[70px] flex-row justify-between px-6">
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
        <p class="text-white">{{ session.data.user.name }}</p>
        <LucideUserCircle :size="40" class="stroke-[1.2]" />
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
      />
      <!-- Button: Sign Up -->
      <UButton
        size="xl"
        class="font-semibold"
        label="Sign up"
        color="secondary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const session = await authClient.getSession();
});
</script>
