import * as bcrypt from 'bcrypt';
import { connection } from '../app';
import { HASH_ROUNDS, HttpStatusMessage } from '../constants';
import { UserAccount } from '../entities/user';
import { IUser } from '../types';
import { InvalidRequestError, NotFoundError } from '../utils/error';
import { Logger } from '../utils/logger';

const logger = new Logger();

/**
 * Creates a User
 *
 * @param user - IUser obj
 * @returns Promise string
 */
export async function createUserP(user: IUser): Promise<{ id: string }> {
  logger.debug('creating a user for id: ', user.id);
  let addedUser: UserAccount;
  try {
    await connection.then(async (connection) => {
      const userAcc = new UserAccount();
      userAcc.id = user.id;
      userAcc.name = user.name;
      userAcc.username = user.username;
      userAcc.password = await hashIt(user.password);
      userAcc.phoneNumber = user.phoneNumber;
      userAcc.email = user.email;
      userAcc.createdAt = new Date();
      addedUser = await connection.manager.save(userAcc);
    });

    return { id: addedUser!.id };
  } catch (err) {
    logger.error('error while creating a user ', err);
    throw new InvalidRequestError(err.message);
  }
}

/**
 * Gets user fields
 *
 * @param userId - string
 * @returns Promise UserAccount | undefined
 */
export async function getUserP(userId: string): Promise<UserAccount | undefined> {
  logger.debug('getting a user for id: ', userId);
  try {
    const result = await connection.then(async (connection) => {
      return connection.manager.findOne(UserAccount, { id: userId });
    });
    if (!result) {
      throw new NotFoundError('no user record found for id: ' + userId);
    }
    return result;
  } catch (err) {
    logger.error('error while getting a user ', err);
    throw new InvalidRequestError(err.message);
  }
}

/**
 * Updates user allowed fields
 *
 * @param userId - string
 * @param username - string
 * @returns Promise UserAccount | undefined
 */
export async function updateUserP(
  userId: string,
  username: string,
): Promise<UserAccount | undefined> {
  logger.debug('updating a user for id: ', userId);
  try {
    const result = await getUserP(userId);
    if (!result) {
      throw new NotFoundError(HttpStatusMessage.NotFoundError);
    }
    result.username = username;
    await connection.then(async (connection) => {
      await connection.manager.save(result);
    });
    return result;
  } catch (err) {
    logger.error('error while updating a user ', err);
    throw new InvalidRequestError(err.message);
  }
}

/**
 * Gets user login response
 *
 * @param username - string
 * @param password - string
 * @returns Promise<boolean>
 */
export async function getUserLoginP(username: string, password: string): Promise<boolean> {
  try {
    const repository = (await connection).getRepository(UserAccount);
    const field = await repository.findOne({ select: ['password'], where: { username: username } });
    return await compareIt(password, field!.password);
  } catch (err) {
    throw new InvalidRequestError(err.message);
  }
}

/**
 * Hashes password
 *
 * @param password - string
 * @returns string
 */
async function hashIt(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(HASH_ROUNDS);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

/**
 * Compares hashed and incoming password
 *
 * @param password - string
 * @param hashedPassword - string
 * @returns Promise<boolean>
 */
async function compareIt(password: string, hashedPassword: string): Promise<boolean> {
  const validPassword = await bcrypt.compare(password, hashedPassword);
  return validPassword;
}
