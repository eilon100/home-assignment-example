import { ClientSession, ProjectionType, Types } from 'mongoose';
import { UserAttrs, UserDoc, UserModel } from '../models/User';
import { Dal } from './Dal';

export class UserDal extends Dal<UserDoc, UserModel> {
  async createUser(UserAttrs: UserAttrs, session?: ClientSession) {
    const buyer = this.model.build(UserAttrs);

    await buyer.save({ ...(session && { session }) });
    return buyer;
  }

  async findByUsername(username: string) {
    return await this.model.findOne({ username });
  }

  async findUserById(buyerId: string, projection?: ProjectionType<UserDoc>) {
    return await this.model.findOne(
      { _id: buyerId },
      projection ? { ...(projection as object) } : {}
    );
  }
  async addFavoriteCityToUser(
    userId: Types.ObjectId,
    FavoriteCityId: Types.ObjectId
  ) {
    return await this.model.updateOne(
      { _id: userId },
      { $push: { favorites: FavoriteCityId } }
    );
  }
  async isCityInsideFavorites(
    userId: Types.ObjectId,
    FavoriteCityId: Types.ObjectId
  ) {}

  async getFavoriteCitiesFromUser(
    userId: string,
    projection?: ProjectionType<UserDoc>
  ) {
    return await this.model.findOne(
      { _id: userId },
      { 'favorite.$': 1 },
      projection ? { ...(projection as object) } : {}
    );
  }
  async deleteFavoriteCityFromUser(userId: string, FavoriteCityId: string) {
    return await this.model.updateOne(
      { _id: userId },
      { $pop: { favorites: FavoriteCityId } }
    );
  }
}
