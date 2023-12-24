import { z } from 'zod';

import languages from './data/languages';

// import timezones from "../../utils/data/timezones.json";

// const tz = timezones.map((timezone) => {

// });

const globalPreferencesSchema = z.object({
  language: z
    .enum([
      "enUS",
      languages.map((language) => language.label.replace("-", "")).join("|"),
    ])
    .default("enUS"),
  timeZone: z.string().default("Asia/Kolkata"),

  currencyFormat: z.enum(["INR"]).default("INR"),

  defaultNotificationSettings: z
    .object({
      emailNotificationsEnabled: z.boolean().default(true),
      pushNotificationsEnabled: z.boolean().default(true),
      notificationFrequency: z
        .enum(["daily", "weekly", "monthly"])
        .default("daily"),
    })
    .default({}),
});

type GlobalPreferencesFields = z.infer<typeof globalPreferencesSchema>;

const roles = ["Admin", "Manager", "Employee"] as const;

const teamMemberSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(roles).default("Manager"),
  profileImage: z.string().url({ message: "Invalid image url" }).optional(),
});

const teamSchema = z.array(teamMemberSchema);

type ITeamMember = z.infer<typeof teamMemberSchema>;

const phoneNumberRegex = new RegExp("^[0-9]*$");
const websiteUrlRegex = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|localhost)" + // domain name
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
);

const addressSchema = z.object({
  street: z.string().min(2).max(50),
  city: z.string().min(2).max(50),
  state: z.string().min(2).max(50),
  country: z.string().min(2).max(50),
  zip: z.string().min(2).max(50),
});

const setupBusinessSchema = z.object({
  businessName: z.string().min(2).max(50),
  businessType: z.string().min(2).max(50),
  businessWebsite: z.string().regex(websiteUrlRegex).optional(),
  businessAddress: addressSchema.optional(),
  businessPhone: z.string().regex(phoneNumberRegex).min(6).max(14),
  businessDescription: z.string().optional(),
});

type ISetupBusinessForm = z.infer<typeof setupBusinessSchema>;

const setupAccountSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email().max(50),
  country: z.string().optional(),
  phoneNumber: z.string().regex(phoneNumberRegex).min(6).max(14),
  address: z.string().min(10).max(400).optional(),
  website: z
    .string()
    .optional()
    .refine((val) => {
      try {
        new URL(val ?? "");
        return true;
      } catch (e: any) {
        return e.message;
      }
    }),
});

type ISetupAccountForm = z.infer<typeof setupAccountSchema>;

const allFieldsSchema = z.object({
  setupAccount: setupAccountSchema,
  setupBusiness: setupBusinessSchema,
  teamMembers: teamSchema,
  globalPreferences: globalPreferencesSchema,
});

type IAllFields = z.infer<typeof allFieldsSchema>;

export {
  globalPreferencesSchema,
  teamMemberSchema,
  teamSchema,
  allFieldsSchema,
  roles,
  setupBusinessSchema,
  setupAccountSchema,
};
export type {
  GlobalPreferencesFields,
  ITeamMember,
  ISetupAccountForm,
  ISetupBusinessForm,
  IAllFields,
};
