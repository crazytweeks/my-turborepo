import type { Model } from "mongoose";
import { model, Schema } from "mongoose";

interface IBusinessType {
  name: string;
  description?: string;
  icon?: string;
}

const BusinessTypeSchema = new Schema<IBusinessType, Model<IBusinessType>>(
  {
    name: {
      type: "String",
      required: true,
      unique: true,
    },
    description: {
      type: "String",
    },
    icon: {
      type: "String",
    },
  },
  {
    timestamps: false,
  },
);

const BusinessType = model<IBusinessType, Model<IBusinessType>>(
  "BusinessType",
  BusinessTypeSchema,
);

export default BusinessType;
export type { IBusinessType };
