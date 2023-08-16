import { RequestHandler } from 'express';
import { Types } from 'mongoose';
import { userDal } from '../../../db/models/User';
import { BadRequestError } from '../../../errors/bad-request';

export const saveFavoriteCity: RequestHandler = async (req, res, next) => {
  // const { userId } = req.session;
  const { cityId } = req.body;

  // await checkIfUserFavoriteIncludeCity(userId, cityId);

  // await updateUserFavorites(userId, cityId);

  res.status(201).json({ success: true });
};

// async function checkIfUserFavoriteIncludeCity(
//   userId: string,
//   cityId: Types.ObjectId
// ) {
//   const query = await userDal.isCityInsideFavorites(userId, cityId);

//   if (query) {
//     throw new BadRequestError('City weather already in favorites');
//   }
// }
// async function updateUserFavorites(
//   userId: Types.ObjectId,
//   cityId: Types.ObjectId
// ) {
//   const query = await userDal.addFavoriteCityToUser(userId, cityId);

//   if (!query.modifiedCount) {
//     throw new BadRequestError('failed save city weather');
//   }
// }
