import { model, Schema, Document, Model, Types } from 'mongoose';
import { UserDal } from '../data-access-layer/User-Dal';

export interface UserAttrs {
  username: string;
  password: string;
}
export interface UserDoc extends UserAttrs, Document {}

export interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const favoriteCityWeather = new Schema(
  {
    localizedName: { type: String, required: true },
    cityKey: [{ type: Types.ObjectId, ref: 'weather' }],
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favoriteCities: [{ type: favoriteCityWeather }],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = model<UserDoc, UserModel>('user', userSchema);

const userDal = new UserDal(User);

export { User, userDal };
