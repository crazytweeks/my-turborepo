import type { FastifyInstance } from "fastify";
import { Types } from "mongoose";

import { IUsers } from "../lib/mongoose/models/user/users";

type RequestQuery = {
  [key: string]: string;
};

declare module "fastify" {
  interface FastifyInstance {
    config: {
      // this should be same as the confKey in options
      // specify your typing here
      PORT: number;
      JWT_SECRET: string;
    };
  }

  interface FastifyRequest {
    usr: IUsers | null;
  }
}

type WithMongoId<T> = T & { _id: Types.ObjectId };

export type { FastifyInstance, RequestQuery, WithMongoId };
