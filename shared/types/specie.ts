import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { specie } from '../../server/db/schema';

export type Specie = InferSelectModel<typeof specie>;
export type SpecieInsert = InferInsertModel<typeof specie>;

export type SpecieClient = Specie;
