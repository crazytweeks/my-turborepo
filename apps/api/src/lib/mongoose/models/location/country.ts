import type { Document, Model } from "mongoose";
import mongoose, { model, Schema, Types } from "mongoose";

interface Timezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

// interface Translations {
//   kr: string;
//   "pt-BR": string;
//   pt: string;
//   nl: string;
//   hr: string;
//   fa: string;
//   de: string;
//   es: string;
//   fr: string;
//   ja: string;
//   it: string;
//   cn: string;
//   tr: string;
// }

interface ICountry {
  country_id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  region_id: string;
  subregion: string;
  subregion_id: string;
  nationality: string;
  timezones: Types.DocumentArray<Timezone>;
  // translations: Translations;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
}

const CountrySchema = new Schema<ICountry, Model<ICountry>>(
  {
    country_id: {
      type: Schema.Types.Number,
    },
    name: {
      type: Schema.Types.String,
    },
    iso3: {
      type: Schema.Types.String,
    },
    iso2: {
      type: Schema.Types.String,
    },
    numeric_code: {
      type: Schema.Types.String,
    },
    phone_code: {
      type: Schema.Types.String,
    },
    capital: {
      type: Schema.Types.String,
    },
    currency: {
      type: Schema.Types.String,
    },
    currency_name: {
      type: Schema.Types.String,
    },
    currency_symbol: {
      type: Schema.Types.String,
    },
    tld: {
      type: Schema.Types.String,
    },
    native: {
      type: Schema.Types.String,
    },
    region: {
      type: Schema.Types.String,
    },
    region_id: {
      type: Schema.Types.String,
    },
    subregion: {
      type: Schema.Types.String,
    },
    subregion_id: {
      type: Schema.Types.String,
    },
    nationality: {
      type: Schema.Types.String,
    },
    timezones: {
      type: [
        {
          zoneName: {
            type: Schema.Types.String,
          },
          gmtOffset: {
            type: Schema.Types.Number,
          },
          gmtOffsetName: {
            type: Schema.Types.String,
          },
          abbreviation: {
            type: Schema.Types.String,
          },
          tzName: {
            type: Schema.Types.String,
          },
        },
      ],
    },
    // translations: {
    //   kr: {
    //     type: Schema.Types.String
    //   },
    //   "pt-BR": {
    //     type: Schema.Types.String
    //   },
    //   pt: {
    //     type: Schema.Types.String
    //   },
    //   nl: {
    //     type: Schema.Types.String
    //   },
    //   hr: {
    //     type: Schema.Types.String
    //   },
    //   fa: {
    //     type: Schema.Types.String
    //   },
    //   de: {
    //     type: Schema.Types.String
    //   },
    //   es: {
    //     type: Schema.Types.String
    //   },
    //   fr: {
    //     type: Schema.Types.String
    //   },
    //   ja: {
    //     type: Schema.Types.String
    //   },
    //   it: {
    //     type: Schema.Types.String
    //   },
    //   cn: {
    //     type: Schema.Types.String
    //   },
    //   tr: {
    //     type: Schema.Types.String
    //   },
    // },
    latitude: {
      type: Schema.Types.String,
    },
    longitude: {
      type: Schema.Types.String,
    },
    emoji: {
      type: Schema.Types.String,
    },
    emojiU: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: false,
  },
);

const Country = model<ICountry>("Country", CountrySchema);

export default Country;
export type { ICountry };
