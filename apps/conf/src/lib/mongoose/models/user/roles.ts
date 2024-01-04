import { model, Model, Schema, Types } from "mongoose";
import { z } from "zod";

import { WithMongoId } from "../../../../utils/types.js";
import mongoIdSchema from "../../../zod/isMongoId.js";

const timestampZodSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

type ITimestamp = z.infer<typeof timestampZodSchema>;

const roleZodSchema = z.object({
  userOid: mongoIdSchema,
  globalRole: mongoIdSchema,
});

type IRole = z.infer<typeof roleZodSchema> & WithMongoId<ITimestamp>;

const roleSchema = new Schema<IRole, Model<IRole>>(
  {
    userOid: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    globalRole: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "globalRoles",
    },
  },
  {
    timestamps: true,
  },
);

const Role = model<IRole, Model<IRole>>("roles", roleSchema);

export default Role;
export type { IRole };
