<template>
  <div
    class="card hover-lift flex size-full w-[50%] cursor-pointer flex-col justify-between gap-4 hover:shadow-xl"
  >
    <div class="flex flex-row items-center justify-between">
      <!-- Request Heading -->
      <div class="flex flex-row items-center gap-3">
        <!-- User Avatar -->
        <UAvatar size="xl" class="rounded-md" :src="avatarUrl" />
        <div class="flex flex-col">
          <!-- Username -->
          <h1 class="text-highlighted text-lg font-semibold">
            Dr. Sarah Johnson
          </h1>
          <!-- User Email -->
          <p class="text-default text-sm">sarah.johnson@university.edu</p>
        </div>
      </div>
      <div class="flex flex-row gap-3">
        <UButton
          icon="i-lucide-check"
          color="success"
          size="xl"
          variant="subtle"
        />
        <UButton icon="i-lucide-x" color="error" size="lg" variant="subtle" />
      </div>
    </div>

    <!-- Request Description -->
    <p class="rounded-md bg-slate-200 p-3 text-sm text-slate-600">
      "I would like to contribute to this project with my expertise in marine
      geology."
    </p>

    <!-- <div class="flex h-full flex-col gap-4"> -->
    <!--   <UButton -->
    <!--     size="lg" -->
    <!--     variant="subtle" -->
    <!--     color="success" -->
    <!--     icon="i-lucide-square-check" -->
    <!--     label="Accept" -->
    <!--   /> -->
    <!--   <UButton -->
    <!--     size="lg" -->
    <!--     variant="subtle" -->
    <!--     color="error" -->
    <!--     icon="i-lucide-square-x" -->
    <!--     label="Refuse" -->
    <!--   /> -->
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  request: {
    type: Object as PropType<RequestClient>,
    required: true
  }
});

const rc = useRuntimeConfig();

const avatarUrl = rc.public.avatarPlaceholderUrl + `&seed=sdfsdfsdf`;
</script>
