export const useInvitesStore = defineStore('invitesStore', {
  state: () => ({
    invites: [] as InviteClient[]
  }),
  actions: {
    async fetch(userId: string) {
      const res = await $fetch.raw(`/api/users/${userId}/invites`, {
        method: 'GET'
      });

      if (!res.ok) {
        return;
      }

      this.invites = res._data ?? [];
    }

    // async delete(detectorId: string, userId: string) {
    //   const res = await $fetch.raw(
    //     `/api/users/${userId}/detectors/${detectorId}`,
    //     {
    //       method: 'DELETE'
    //     }
    //   );
    //
    //   if (!res.ok) {
    //     return;
    //   }
    //
    //   // Remove the deleted detector from the state
    //   this.detectors = this.detectors.filter(
    //     (detector) => detector.id !== detectorId
    //   );
    // }
  }
});
