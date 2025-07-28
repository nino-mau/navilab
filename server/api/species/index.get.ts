import { fetchSpecies } from '~~/server/services/specie.service';

/**
 * Return all species
 *
 * @GET /api/species
 */
export default defineEventHandler(async (event) => {
  try {
    const speciesData = await fetchSpecies();

    setResponseStatus(event, 200);
    return speciesData;
  } catch (err) {
    const error = err as Error;
    console.error('[@GET /api/species] \n', error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
});
