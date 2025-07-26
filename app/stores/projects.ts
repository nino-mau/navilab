import type { ProjectClient } from '#shared/types/projects';

export const useProjectsStore = defineStore('projectsStore', {
  state: () => ({
    projects: [] as ProjectClient[]
  }),
  actions: {
    async fetch(userId: string) {
      const res = await $fetch.raw(`/api/users/${userId}/projects`, {
        method: 'GET'
      });

      if (!res.ok) {
        return;
      }

      this.projects = res._data ?? [];
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
