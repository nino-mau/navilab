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
  }
});
