export const useInvitesStore = defineStore('invitesStore', {
  state: () => ({
    invites: [] as InviteClient[]
  }),
  actions: {
    async fetch(userId: string) {
      const res = await $fetch(`/api/users/${userId}/invites`, {
        method: 'GET'
      });

      this.invites = res ?? [];
    },

    /**
     * Remove a project invites from state
     */
    removeByProjectId(projectId: string) {
      this.invites = this.invites.filter(
        (invite) => invite.projectId !== projectId
      );
    }
  }
});
