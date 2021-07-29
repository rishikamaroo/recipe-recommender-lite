import * as bcrypt from 'bcrypt';
import { connection } from '../app';
import { UserAccount } from '../entities/user';
import { IUser } from '../types';
import { InvalidRequestError, NotFoundError } from '../utils/error';
import { Logger } from '../utils/logger';

const HASH_ROUNDS = 6;

const logger = new Logger();

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

export async function updateUserP(
  userId: string,
  username: string,
): Promise<UserAccount | undefined> {
  logger.debug('updating a user for id: ', userId);
  try {
    const result = await getUserP(userId);
    if (!result) {
      throw new NotFoundError('No resource found');
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

async function hashIt(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(HASH_ROUNDS);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

async function compareIt(password: string, hashedPassword: string): Promise<boolean> {
  const validPassword = await bcrypt.compare(password, hashedPassword);
  return validPassword;
}
