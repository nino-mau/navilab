import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { projectInvite } from '../../server/db/schema';

export type Invite = InferSelectModel<typeof projectInvite>;
export type InviteInsert = InferInsertModel<typeof projectInvite>;

export type InviteStatus = 'not started' | 'in progress' | 'finished';

/**
 * Invite object that is sent to the client.
 */
export type InviteClient = Omit<Invite, 'createdAt'> & {
  createdAt: string;
  projectName: string;
  receiverName: string;
  receiverEmail: string;
};
