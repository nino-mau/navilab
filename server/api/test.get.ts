import { showTables } from '../services/test';

export default defineEventHandler(async () => {
  return await showTables();
});
