import type { InferSelectModel } from 'drizzle-orm';
import type { user } from '~~/server/db/schema';

export type User = InferSelectModel<typeof user>;

export type UserRole = 'Product Manager' | 'Contributor' | 'Admin';
