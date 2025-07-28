import db from '../db/client';
import { specie } from '../db/schema';

/**
 * Fetch all species in db
 */
export async function fetchSpecies() {
  const res = db.select().from(specie);
  return res;
}
