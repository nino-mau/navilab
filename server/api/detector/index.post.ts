import { z } from 'zod';
import { auth } from '@server/utils/auth';
import { createDetector } from '~~/server/services/detector.service';
import { hashPassword } from '~~/shared/utils/bcrypt';
import { DETECTOR_TYPES } from '~~/shared/utils/constants';

// Data validation schema
const dataValidationSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/),
  serialNumber: z.string().min(1),
  type: z.enum(DETECTOR_TYPES),
  password: z.string().min(8),
  confirmPassword: z.string().min(1)
});

/**
 * Create a detector in database
 *
 * @POST /api/detector
 */
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, dataValidationSchema.parse);
  const session = await auth.api.getSession({
    headers: event.headers
  });

  // Get creator id
  const creatorId = session?.user.id;
  if (!creatorId) {
    throw createError({
      statusCode: 500,
      statusMessage: "Can't access user session"
    });
  }

  // Create hashed password
  const hashedPassword = await hashPassword(body.password);
  if (!hashedPassword) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate hash from password'
    });
  }

  // Create detector id
  const id = crypto.randomUUID();

  // Insert in db
  const res = await createDetector(
    id,
    creatorId,
    body.name,
    body.serialNumber,
    body.type,
    hashedPassword
  );

  if (!res.length || !res[0].insertId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to insert detector into database'
    });
  }

  setResponseStatus(event, 201);
  return { detectorId: res[0].insertId };
});
