import { genSalt, hash, compare } from 'bcrypt-ts';

/**
 * Generate a hash from a password with bcrypt
 */
export async function hashPassword(pwd: string): Promise<string | null> {
  try {
    const saltRounds = 4;
    const salt = await genSalt(saltRounds);
    return await hash(pwd, salt);
  } catch (err) {
    console.error(
      '[hashPassword()] Failed to generate hashed password: \n',
      err
    );
    return null;
  }
}

/**
 * Check if password match hash
 */
export async function checkPassword(
  pwd: string,
  hash: string
): Promise<boolean | null> {
  try {
    return await compare(pwd, hash);
  } catch (err) {
    console.error(
      '[hashPassword()] Failed to check password validity: \n',
      err
    );
    return null;
  }
}
