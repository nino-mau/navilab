import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './server/db',
  schema: './server/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  introspect: {
    casing: 'camel'
  },
  tablesFilter: ['!spatial_ref_sys', '!geography_columns', '!geometry_columns']
});
