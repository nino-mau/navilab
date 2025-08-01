import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { projectRequest } from '../../server/db/schema';

export type Request = InferSelectModel<typeof projectRequest>;
export type RequestInsert = InferInsertModel<typeof projectRequest>;

export type RequestStatus = 'accepted' | 'refused' | 'pending';

/**
 * Request object that is sent to the client.
 */
export type RequestClient = Omit<Request, 'createdAt'> & {
  createdAt: string;
  projectName: string;
  requesterName: string;
  requesterEmail: string;
};
