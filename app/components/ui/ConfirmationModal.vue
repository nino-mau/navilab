<template>
  <UModal
    v-model:open="isOpen"
    :description="confirmProps.desc"
    :ui="{
      description: 'mt-2.5 pr-7'
    }"
  >
    <template #title>
      <div class="flex flex-row items-center gap-3.5">
        <UIcon :name="confirmProps.icon" :size="20" class="text-error" />
        <h1 class="text-highlighted font-semibold">
          {{ confirmProps.title }}
        </h1>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-3">
        <!-- Button: Continue Operation -->
        <UButton
          color="neutral"
          variant="outline"
          label="Confirm"
          @click="handleConfirm()"
        />
        <!-- Button: Cancel Operation -->
        <UButton
          label="Cancel"
          variant="solid"
          color="error"
          @click="handleCancel()"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const { isOpen, confirmProps, handleConfirm, handleCancel } = useConfirmModal();
</script>
