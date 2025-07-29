export const useRequestsStore = defineStore('requestsStore', {
  state: () => ({
    requests: [] as RequestClient[]
  }),
  actions: {
    async fetch(userId: string) {
      const res = await $fetch.raw(`/api/users/${userId}/requests`, {
        method: 'GET'
      });

      if (!res.ok) {
        return;
      }

      this.requests = res._data ?? [];
    },

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

    /**
     * Remove a project requests from state
     */
    removeByProjectId(projectId: string) {
      this.requests = this.requests.filter(
        (request) => request.projectId !== projectId
      );
    }
  }
});
