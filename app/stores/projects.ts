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

      // Remove the deleted detector from the state
      this.projects = this.projects.filter(
        (project) => project.id !== projectId
      );
    }
  }
});
