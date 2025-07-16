# NAVILAB

## Useful Commands

### Generate a Dump of the Database (Excluding Specific Schemas)

Creates dump of the `nuxt_db` database without the schema:

```bash
docker compose exec -T postgres pg_dump -U admin \
  --exclude-schema=tiger \
  --exclude-schema=tiger_data \
  --exclude-schema=topology \
  nuxt_db > ./server/backups/db_dump.sql

```
