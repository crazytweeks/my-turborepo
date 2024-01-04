import * as shared from "@repo/shared";
import { Model, model, Schema } from "mongoose";
import { z } from "zod";

import mongoIdSchema from "../../../zod/isMongoId";

const { appModules } = shared;

const permissionsZodSchema = z.object({
  view: z.boolean().default(false),
  create: z.boolean().default(false),
  update: z.boolean().default(false),
  delete: z.boolean().default(false),
  download: z.boolean().default(false),
});

const moduleRolesZodSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  moduleId: z.string().uuid(),
  permissions: permissionsZodSchema,
  userId: mongoIdSchema,
});

type IModuleRoles = z.infer<typeof moduleRolesZodSchema>;
type IPermissions = z.infer<typeof permissionsZodSchema>;

const permissionsSchema = new Schema<IPermissions, Model<IPermissions>>(
  {
    view: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    create: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    update: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    delete: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    download: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
  },
  { _id: false, timestamps: false },
);

const moduleRoleSchema = new Schema<IModuleRoles, Model<IModuleRoles>>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    moduleId: {
      type: Schema.Types.String,
      required: true,
      enum: appModules.moduleIdEnum,
    },
    permissions: {
      type: permissionsSchema,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  },
);

const ModuleRole = model<IModuleRoles, Model<IModuleRoles>>(
  "moduleRoles",
  moduleRoleSchema,
);

export default ModuleRole;
export type { IModuleRoles };
