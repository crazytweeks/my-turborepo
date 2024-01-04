import type { Model } from "mongoose";
import { model, Schema } from "mongoose";

interface ICity {
  city_id: number;
  name: string;
  state_id: number;
  state_code: string;
  state_name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  latitude: string;
  longitude: string;
  wikiDataId: string;
}

const CitySchema = new Schema<ICity, Model<ICity>>(
  {
    city_id: {
      type: "Number",
    },
    name: {
      type: "String",
    },
    state_id: {
      type: "Number",
    },
    state_code: {
      type: "String",
    },
    state_name: {
      type: "String",
    },
    country_id: {
      type: "Number",
    },
    country_code: {
      type: "String",
    },
    country_name: {
      type: "String",
    },
    latitude: {
      type: "String",
    },
    longitude: {
      type: "String",
    },
    wikiDataId: {
      type: "String",
    },
  },
  {
    timestamps: false,
  },
);

const City = model<ICity, Model<ICity>>("City", CitySchema);

export default City;
export type { ICity };
