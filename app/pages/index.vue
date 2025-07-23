<template>
  <div class="mx-6 flex flex-col gap-10">
    <!-- Card: Welcome Heading -->
    <div class="card mt-10 flex flex-col gap-4 rounded-md p-8 shadow-md">
      <h1 class="text-default text-4xl font-bold">Welcome To Navilab</h1>
      <p class="text-text2 text-xl font-medium opacity-80">
        Lorem ipsum lorem ipsum lorem
      </p>
    </div>

    <div
      class="grid grow grid-cols-[1fr_1fr_1fr] grid-rows-[230px_230px] gap-x-6 gap-y-6"
    >
      <!-- Link: Projects -->
      <UButton
        variant="link"
        :class="
          cn(
            'hover:bg-primary/90 hvr-grow-big !flex !transition-all !duration-250 !ease-out',
            'bg-primary col-span-1 row-span-1 cursor-pointer flex-col items-center justify-center gap-4 rounded-md shadow-md'
          )
        "
        to="/projects"
        aria-label="Go to projects page"
      >
        <LucideLayers :size="80" class="stroke-[1.2]" />
        <h2 class="text-2xl font-semibold text-white">Projects</h2>
      </UButton>
      <!-- Link: Detectors -->
      <UButton
        variant="link"
        :class="
          cn(
            'hover:bg-primary/90 hvr-grow-big !flex !transition-all !duration-250 !ease-out',
            'bg-primary col-span-1 row-span-1 cursor-pointer flex-col items-center justify-center gap-3 rounded-md shadow-md'
          )
        "
        to="/detectors"
        aria-label="Go to detectors page"
      >
        <LucideRadar :size="80" class="stroke-[1.2]" />
        <h2 class="text-2xl font-semibold text-white">Detectors</h2>
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import cn from 'cn-lib';
</script>
