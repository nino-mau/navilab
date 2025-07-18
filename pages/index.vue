<template>
  <div class="mx-6 flex flex-col gap-10">
    <!-- Card: Welcome Heading -->
    <div
      class="bg-secondary mt-10 flex flex-col gap-4 rounded-md p-8 shadow-md"
    >
      <h1 class="text-4xl font-bold">Welcome To Navilab</h1>
      <p class="text-xl font-medium opacity-80">
        Lorem ipsum lorem ipsum lorem
      </p>
    </div>

    <div
      class="grid grow grid-cols-[1fr_1fr_1fr] grid-rows-[230px_230px] gap-x-6 gap-y-6"
    >
      <!-- Link: Projects -->
      <button
        :class="
          cn(
            'bg-primary col-span-1 row-span-1 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md shadow-md',
            'hover:bg-primary/90 hvr-float !transition-all !duration-250 !ease-out'
          )
        "
        aria-label="Go to projects page"
      >
        <LucideMap :size="80" class="stroke-[1.2]" />
        <h2 class="text-2xl font-semibold">Projects</h2>
      </button>
      <!-- Link: Detectors -->
      <button
        :class="
          cn(
            'bg-primary col-span-1 row-span-1 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md shadow-md',
            'hover:bg-primary/90 hvr-float !transition-all !duration-250 !ease-out'
          )
        "
        aria-label="Go to detectors page"
      >
        <LucideRadio :size="80" class="stroke-[1.2]" />
        <h2 class="text-2xl font-semibold">Detectors</h2>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import cn from 'cn-lib';
</script>
