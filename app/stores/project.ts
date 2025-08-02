import type { ProjectDetailsClient } from '#shared/types/projects';

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    project: {} as ProjectDetailsClient
  }),

  getters: {
    detectorsCount(): number {
      return this.project.detectors.length || 0;
    },
    contributorsCount(): number {
      return this.project.contributors.length || 0;
    },
    requestsCount(): number {
      return this.project.requests.length || 0;
    },
    invitesCount(): number {
      return this.project.invites.length || 0;
    }
  },

  actions: {
    /**
     *   : Data Fetching
     */

    async fetch(projectId: string, userId: string) {
      const res = await $fetch(`/api/users/${userId}/projects/${projectId}`, {
        method: 'GET'
      });

      this.project = res;
    },

    /**
     *   : Data Processing
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
