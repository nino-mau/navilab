<template>
  <div
    class="card hover-lift flex h-fit cursor-pointer flex-col gap-4 !p-4 hover:shadow-xl"
  >
    <div class="flex flex-row items-center justify-between">
      <div class="flex flex-row gap-4">
        <UAvatar
          :chip="{
            color: 'success',
            position: 'bottom-right',
            inset: true,
            size: 'xl'
          }"
          :src="avatarUrl"
          size="3xl"
          class="rounded-sm"
        />
        <div class="flex flex-col">
          <h2 class="text-highlighted text-xl font-bold">Username</h2>
          <p class="text-default">user@gmail.com</p>
        </div>
      </div>
      <UButton
        size="lg"
        class="size-fit"
        color="neutral"
        icon="i-lucide-ellipsis"
        variant="subtle"
      />
    </div>
    <div
      class="flex flex-row justify-between border-t-1 border-t-slate-300 pt-3.5"
    >
      <!-- <div class="flex flex-row items-center gap-1"> -->
      <!--   <LucideRadar :size="18" class="!text-primary" /> -->
      <!--   <p class="text-default text-sm">12 Detectors</p> -->
      <!-- </div> -->
      <!-- <UBadge label="active" color="success" variant="subtle" /> -->
      <UBadge label="124 Contributions" color="neutral" variant="subtle" />
      <UBadge
        label="12  Detectors"
        icon="i-lucide-radar"
        color="primary"
        variant="solid"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const rc = useRuntimeConfig();

const avatarUrl = rc.public.avatarPlaceholderUrl + `&seed=sdfsdfsdf`;
</script>
