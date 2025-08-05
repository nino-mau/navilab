import type { ProjectDetailsClient } from '#shared/types/projects';

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    project: undefined as ProjectDetailsClient | undefined
  }),

  getters: {
    pendingRequests(): ProjectDetailsClient['requests'] {
      return this.project!.requests.filter(
        (request) => request.status === 'pending'
      );
    },

    /**
     *   : COUNTS
     */

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

      // Remove the removed detector from the state
      if (this.project) {
        this.project.detectors = this.project.detectors.filter(
          (detector) => detector.id !== detectorId
        );
      }
    },

    async acceptRequest(requestId: string, projectId: string, userId: string) {
      const res = await $fetch.raw(
        `/api/users/${userId}/projects/${projectId}/requests/${requestId}`,
        {
          method: 'PATCH',
          body: { action: 'accept' }
        }
      );

      if (!res.ok) {
        return;
      }

      if (this.project) {
        // Change accepted request status
        this.project.requests = this.project.requests.map((request) => {
          if (request.id === requestId) {
            return {
              ...request,
              status: 'accepted'
            };
          }
          return {
            ...request
          };
        });

        if (!res._data?.contributorDetails) {
          console.error(
            '[ProjectStore][acceptRequest] Server failed to return new contributor object'
          );
          return;
        }

        // Add newly created contributors to project state
        this.project.contributors.push({
          ...res._data.contributorDetails,
          status: 'inactive'
        });
      }
    },

    async refuseRequest(requestId: string, projectId: string, userId: string) {
      const res = await $fetch.raw(
        `/api/users/${userId}/projects/${projectId}/requests/${requestId}`,
        {
          method: 'PATCH',
          body: { action: 'refuse' }
        }
      );

      if (!res.ok) {
        return;
      }

      if (this.project) {
        // Change refused request status
        this.project.requests = this.project.requests.map((request) => {
          if (request.id === requestId) {
            return {
              ...request,
              status: 'refused'
            };
          }
          return {
            ...request
          };
        });
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
