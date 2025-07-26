import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { project } from '../../server/db/schema';

export type Project = InferSelectModel<typeof project>;
export type ProjectInsert = InferInsertModel<typeof project>;

export type ProjectStatus = 'not started' | 'in progress' | 'finished';

/**
 * Project object that is sent to the client.
 */
export type ProjectClient = Project & {
  contributorsCount: number;
  detectorsCount: number;
  invitesCount: number;
  requestsCount: number;
  status: ProjectStatus;
  specieName: string;
};
