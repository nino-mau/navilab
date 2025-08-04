import type { ProjectDetailsClient } from '#shared/types/projects';

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    project: undefined as ProjectDetailsClient | undefined
  }),

  getters: {
    detectorsCount(): number {
      return this.project?.detectors.length || 0;
    },
    contributorsCount(): number {
      return this.project?.contributors.length || 0;
    },
    requestsCount(): number {
      return this.project?.requests.length || 0;
    },
    invitesCount(): number {
      return this.project?.invites.length || 0;
    },

    activeDetectorsCount(): number {
      return (
        this.project?.detectors.filter(
          (detector) => detector.status !== 'inactive'
        ).length || 0
      );
    },
    activeContributorsCount(): number {
      return (
        this.project?.contributors.filter(
          (contributor) => contributor.status !== 'inactive'
        ).length || 0
      );
    }
  },

  actions: {
    /**
     *   : API ACTIONS
     */

    async fetch(projectId: string, userId: string) {
      const res = await $fetch(`/api/users/${userId}/projects/${projectId}`, {
        method: 'GET'
      });

      this.project = res;
    },

    async delete(projectId: string, userId: string) {
      const res = await $fetch.raw(
        `/api/users/${userId}/projects/${projectId}`,
        {
          method: 'DELETE'
        }
      );

      if (!res.ok) {
        return;
      }

      this.project = undefined;
    },

    async removeDetector(
      detectorId: string,
      projectId: string,
      userId: string
    ) {
      const res = await $fetch.raw(
        `/api/users/${userId}/projects/${projectId}/detectors/${detectorId}`,
        {
          method: 'DELETE'
        }
      );

      if (!res.ok) {
        return;
      }

      // Remove the deleted detector from the state
      if (this.project) {
        this.project.detectors = this.project.detectors.filter(
          (detector) => detector.id !== detectorId
        );
      }
    },

    /**
     *   : STATE MANIPULATION
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
