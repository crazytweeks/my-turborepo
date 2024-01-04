import type { Model, Types } from "mongoose";
import { model, Schema } from "mongoose";

import { WithMongoId } from "../../../../utils/types.js";
import { redisClient } from "../../../redis/connection.js";

interface IIdentities {
  provider: string;
  user_id: string;
  connection: string;
  isSocial: boolean;
}

interface IUsers {
  firstName: string;
  lastName?: string;
  nickName?: string;
  email: string;
  email_verified: boolean;
  phoneNumber?: string;
  phoneNumber_verified?: boolean;
  picture?: string;

  identities: IIdentities[];
  address?: string;

  createdAt: Date;
  updatedAt: Date;
}

const identitiesSchema = new Schema<IIdentities, Model<IIdentities>>(
  {
    provider: {
      type: Schema.Types.String,
      required: true,
    },
    user_id: {
      type: Schema.Types.String,
      required: true,
    },
    connection: {
      type: Schema.Types.String,
      required: true,
    },
    isSocial: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
  },
  { _id: false, timestamps: false },
);

const usersSchema = new Schema<IUsers, Model<IUsers>>(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: false,
    },
    nickName: {
      type: Schema.Types.String,
      required: false,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    email_verified: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    phoneNumber: {
      type: Schema.Types.String,
      required: false,
    },
    phoneNumber_verified: {
      type: Schema.Types.Boolean,
      required: false,
      default: false,
    },
    picture: {
      type: Schema.Types.String,
      required: false,
    },
    address: {
      type: Schema.Types.String,
      required: false,
    },
    identities: {
      type: [identitiesSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const findUserByEmail = async (email: string) =>
  new Promise<WithMongoId<IUsers>>(async (resolve, reject) => {
    const cache = await redisClient.get(`user:${email}`); // check redis cache

    if (cache) {
      return resolve(JSON.parse(cache));
    }

    await Users.findOne({ email })
      .catch(reject)
      .then((user) => {
        if (user) {
          redisClient.setex(
            `user:${email}`,
            60 * 60 * 2, // 2 hours
            JSON.stringify(user),
          );

          resolve(user);
        } else {
          reject(null);
        }
      });
  });

const findUserById = async (id: string) =>
  new Promise<WithMongoId<IUsers>>(async (resolve, reject) => {
    const cache = await redisClient.get(`user:${id}`); // check redis cache

    if (cache) {
      return resolve(JSON.parse(cache));
    }

    await Users.findById(id)
      .catch(reject)
      .then((user) => {
        if (user) {
          redisClient.setex(
            `user:${id}`,
            60 * 60 * 2, // 2 hours
            JSON.stringify(user),
          );

          resolve(user);
        } else {
          reject(null);
        }
      });
  });

const findUserByIdentity = async (user_id: string, provider?: string) =>
  new Promise<WithMongoId<IUsers>>(async (resolve, reject) => {
    const query = provider
      ? { "identities.user_id": user_id, "identities.provider": provider }
      : { "identities.user_id": user_id };

    const cache = await redisClient.get(`user:${user_id}`); // check redis cache

    if (cache) {
      const usersWithId = JSON.parse(cache) as WithMongoId<IUsers>;
      if (provider) {
        const user = usersWithId.identities.find(
          (identity) => identity.provider === provider,
        );
        if (user) {
          return resolve(usersWithId);
        }
      } else {
        return resolve(usersWithId);
      }
    }

    const find = await Users.findOne(query)
      .catch(reject)
      .then((user) => {
        if (user) {
          redisClient.setex(
            `user:${user_id}`,
            60 * 60 * 2, // 2 hours
            JSON.stringify(user),
          );

          return user;
        } else {
          return null;
        }
      });

    if (!find) {
      return reject(null);
    }

    return resolve(find);
  });

const Users = model<IUsers, Model<IUsers>>("users", usersSchema);

export default Users;
export type { IUsers };

export { findUserByEmail, findUserById, findUserByIdentity };
