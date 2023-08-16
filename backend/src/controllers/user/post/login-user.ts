import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { userDal, UserDoc } from '../../../db/models/User';
import { BadRequestError } from '../../../errors/bad-request';
const bcrypt = require('bcryptjs');

const errorMessage = 'סיסמה או שם משתמש שגויים';

export const loginUser: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  const user = await findBuyer(username);

  await validatePassword(user, password);

  const userToken = createUserToken(user);

  // req.session = { userId: userToken };

  res.json({ success: true, token: userToken });
};

async function findBuyer(username: string) {
  const buyer = await userDal.findByUsername(username);

  if (!buyer) {
    throw new BadRequestError(errorMessage);
  }

  return buyer;
}

async function validatePassword(user: UserDoc, password: string) {
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new BadRequestError(errorMessage);
  }
}

function createUserToken(user: UserDoc) {
  const payload = {
    id: user._id,
    username: user.username,
  };

  return jwt.sign(payload, process.env.USER_SECRET!, { expiresIn: '2d' });
}
