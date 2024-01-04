import type { Model } from "mongoose";
import { model, Schema } from "mongoose";
import { z } from "zod";

const versionRegex = new RegExp(
  /* v1, v2, v3, v4.. , v1.0, v1.2, v2.01, ... */
  /^v\d+(\.\d+)?$/i,
);

const phoneNumberRegex = new RegExp(
  /^(\+1|1)?\s?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/,
); /* 123-456-7890, 123.456.7890, 123 456 7890, (123) 456 7890, (123).456.7890, (123)-456-7890, +1 123-456-7890, +1 (123)-456-7890 */

const onlyDigitsRegex = new RegExp(/^\d+$/); /* 1234567890 */

const wpConfigZodSchema = z.object({
  businessId: z.string().min(1).regex(onlyDigitsRegex, "Must be a number."),
  phoneNumberId: z.string().min(1).regex(onlyDigitsRegex, "Must be a number."),
  userAccessToken: z.string().min(1),
  version: z
    .string()
    .min(1)
    .regex(versionRegex, "Enter a valid version. v1, v2, v3, v4, v5...")
    .default("v18.0"),
  phoneNumber: z
    .string()
    .min(1)
    .regex(phoneNumberRegex, "Enter a valid phone number.")
    .transform((value) => {
      return value.replace(/\D/g, ""); // remove all non-digits
    }),
});

type IWpConfig = z.infer<typeof wpConfigZodSchema>;

const WpConfigSchema = new Schema<IWpConfig, Model<IWpConfig>>(
  {
    businessId: {
      type: String,
      required: true,
    },
    phoneNumberId: {
      type: String,
      required: true,
    },
    userAccessToken: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  },
);

// WpConfigSchema.pre("save", function (next) {
//   const doc = this as IWpConfig;

//   doc.version = doc.version.toLowerCase().trim();

//   if (wpConfigZodSchema.safeParse(doc)) next();

//   next(new Error("Invalid data."));
// });

const WpConfig = model<IWpConfig, Model<IWpConfig>>("WpConfig", WpConfigSchema);

export default WpConfig;
export type { IWpConfig };
export { wpConfigZodSchema };
