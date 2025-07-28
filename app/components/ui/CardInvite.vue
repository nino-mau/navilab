<template>
  <div
    class="card hover-lift flex size-full cursor-pointer flex-row items-center justify-between hover:shadow-xl"
  >
    <div class="flex flex-col gap-2.5">
      <div class="flex flex-row items-center gap-4">
        <!-- Receiver Name -->
        <h2 class="text-default text-lg font-medium">
          {{ props.invite.receiverEmail }}
        </h2>

        <!-- Invite Status -->
        <UBadge
          size="lg"
          :color="statusBadgeColor"
          variant="soft"
          :label="props.invite.status"
        />
      </div>
      <!-- Since Sent Time -->
      <p class="text-default text-xs opacity-80">
        Sent {{ timeRemaining(props.invite.createdAt) }}
      </p>
    </div>

    <!-- Status Icon: Accepted -->
    <LucideCheckCircle
      v-if="props.invite.status === 'accepted'"
      class="!text-success"
      :size="28"
    />
    <!-- Status Icon: Refused -->
    <LucideXCircle
      v-else-if="props.invite.status === 'refused'"
      class="!text-error"
      :size="28"
    />
    <!-- Button: Resend Invite -->
    <UButton
      v-else
      class="h-fit"
      label="Resend"
      icon="i-lucide-send"
      size="xl"
      color="neutral"
      variant="subtle"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  invite: {
    type: Object as PropType<InviteClient>,
    required: true
  }
});

const statusBadgeColor = computed(() => {
  if (props.invite.status === 'accepted') return 'success';
  if (props.invite.status === 'refused') return 'error';
  return 'warning';
});
</script>
