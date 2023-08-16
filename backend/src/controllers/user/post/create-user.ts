import { Request, RequestHandler } from 'express';
import { userDal } from '../../../db/models/User';
import { BadRequestError } from '../../../errors/bad-request';
const bcrypt = require('bcryptjs');

const errorMessage = 'failed create user';

export const createUser: RequestHandler = async (req, res) => {
  await createNewUser(req.body);

  res.status(201).json({ success: true });
};

async function createNewUser(reqBody: Request['body']) {
  const { password, username } = reqBody;

  const hashedPassword = await createHashedPassword(password);

  const user = await userDal.createUser({ username, password: hashedPassword });
  if (!user) {
    throw new BadRequestError(errorMessage);
  }
  return user;
}

async function createHashedPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 12);

  return hashedPassword;
}
