<template>
  <div class="bg-primary-500 flex h-[70px] flex-row justify-between px-6">
    <!-- Site Title -->
    <div class="flex flex-row items-center">
      <IconsSite />

      <h2 class="ml-3 text-2xl font-bold">NAVILAB</h2>
    </div>

    <!-- LoggedIn Menu -->
    <div v-if="props.isLoggedIn" class="flex flex-row items-center gap-5">
      <!-- Button: Settings -->
      <LucideSettings :size="24" />
      <!-- Button: Notifications -->
      <LucideBell :size="24" />
      <div class="flex items-center gap-2.5">
        <p>Username</p>
        <LucideUserCircle :size="40" class="stroke-[1.4]" />
      </div>
    </div>

    <!-- LoggedOut Menu  -->
    <div v-else class="flex flex-row items-center gap-5">
      <!-- Button: Login -->
      <UButton label="Login" color="tertiary" />
      <!-- Button: Sign Up -->
      <UButton size="xl" label="Sign Up" color="secondary" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
});
</script>
