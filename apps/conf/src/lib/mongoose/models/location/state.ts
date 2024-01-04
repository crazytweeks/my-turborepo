import type { Model } from "mongoose";
import { model, Schema } from "mongoose";

interface IState {
  state_id: number;
  name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  state_code: string;
  type: string;
  latitude: string;
  longitude: string;
}

const StateSchema = new Schema<IState, Model<IState>>(
  {
    state_id: {
      type: "Number",
      required: true,
    },
    name: {
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
    state_code: {
      type: "String",
    },
    type: {
      type: "String",
    },
    latitude: {
      type: "String",
    },
    longitude: {
      type: "String",
    },
  },
  {
    timestamps: false,
  },
);

const State = model<IState, Model<IState>>("State", StateSchema);

export default State;
export type { IState };
