import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { project } from '../../server/db/schema';
import type { DetectorClient } from './detector';
import type { Invite } from './invite';
import type { RequestClient } from './request';

export type Project = InferSelectModel<typeof project>;
export type ProjectInsert = InferInsertModel<typeof project>;

export type ProjectStatus = 'not started' | 'in progress' | 'finished';

export type ProjectContributorStatus = 'inactive' | 'active';

/**
 * Project object without details that is sent to the client.
 */
export type ProjectClient = Project & {
  contributorsCount: number;
  detectorsCount: number;
  invitesCount: number;
  requestsCount: number;
  status: ProjectStatus;
  specieName: string;
};

/**
 * Project object with details that is sent to the client.
 */
export type ProjectDetailsClient = Omit<
  Project,
  'startDate' | 'endDate' | 'lastUpdate'
> & {
  managerEmail: string;
  startDate: string;
  endDate: string;
  lastUpdate: string;
  status: ProjectStatus;
  specieName: string;
  contributors: {
    id: string;
    name: string;
    email: string;
    status: ProjectContributorStatus;
  }[];
  detectors: DetectorClient[];
  requests: RequestClient[];
  invites: (Omit<Invite, 'createdAt'> & { createdAt: string })[];
};
