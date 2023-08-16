import mongoose, { ClientSession, Document, Model } from 'mongoose';

export class Dal<
  CustomDoc extends Document,
  CustomModel extends Model<CustomDoc>
> {
  constructor(protected model: CustomModel) {}

  async startSession() {
    const session = await this.model.startSession();

    return session;
  }

  static async startTransaction(session: ClientSession) {
    session.startTransaction();
  }

  static async commitTransaction(session: ClientSession) {
    await session.commitTransaction();
  }

  static async abortTransaction(session: ClientSession) {
    await session.abortTransaction();
  }

  static async startDistributedSession() {
    const session = await mongoose.startSession();

    return session;
  }
}
