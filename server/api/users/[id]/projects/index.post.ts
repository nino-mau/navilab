import { z } from 'zod';
import { createProject } from '@server/services/project';

// Data validation schema
const dataValidationSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/),
  description: z.string().min(1).max(150),
  specie: z.object({
    value: z.string().min(1)
  }),
  locationLabel: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/),
  startDate: z.iso.date().min(1),
  endDate: z.iso.date().min(1),
  private: z.boolean()
});

/**
 * Create a project in database
 *
 * @POST /api/users/[id]/projects
 */
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, dataValidationSchema.parse);
  const managerId = getRouterParam(event, 'id');

  if (!managerId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing userId'
    });
  }

  // Insert in db
  const res = await createProject(
    crypto.randomUUID(),
    managerId,
    body.name,
    body.description,
    body.locationLabel,
    body.specie.value,
    body.private,
    body.startDate,
    body.endDate
  );

  if (!res.length || !res[0].insertId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to insert project into database'
    });
  }

  setResponseStatus(event, 201);
  return { projectId: res[0].insertId };
});
