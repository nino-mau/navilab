import type { DetectorClient } from '#shared/types/detector';

export const useDetectorsStore = defineStore('detectorsStore', {
  state: () => ({
    detectors: [] as DetectorClient[]
  }),
  actions: {
    async fetch(userId: string) {
      const res = await $fetch.raw(`/api/users/${userId}/detectors`, {
        method: 'GET'
      });

      if (!res.ok) {
        return;
      }

      this.detectors = res._data ?? [];
    },

    async delete(detectorId: string, userId: string) {
      const res = await $fetch.raw(
        `/api/users/${userId}/detectors/${detectorId}`,
        {
          method: 'DELETE'
        }
      );

      if (!res.ok) {
        return;
      }

      // Remove the deleted detector from the state
      this.detectors = this.detectors.filter(
        (detector) => detector.id !== detectorId
      );
    }
  }
});
