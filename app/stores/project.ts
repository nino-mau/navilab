import type { ProjectDetailsClient } from '#shared/types/projects';

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    project: undefined as ProjectDetailsClient | undefined
  }),

  actions: {
    /**
     *
     *   : Data Fetching
     *
     */

    async fetch(projectId: string, userId: string) {
      const res = await $fetch.raw(
        `/api/users/${userId}/projects/${projectId}`,
        {
          method: 'GET'
        }
      );

      if (!res.ok) {
        return;
      }

      this.project = res._data;
    },

    /**
     *
     *   : Data Processing
     *
     */

    /**
     * Get the amount of detectors a contributor has added to a project
     */
    getContributorDetectorsCount(contributorId: string): number {
      return (
        this.project?.detectors.filter(
          (detector) => detector.creatorId === contributorId
        ).length || 0
      );
    }
  }
});
