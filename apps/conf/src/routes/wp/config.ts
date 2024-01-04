import { z } from "zod";

import { wpConfigZodSchema } from "../../lib/mongoose/models/index.js";
import WpConfig from "../../lib/mongoose/models/wp/wpConfig.js";
import { publicProcedure } from "../trpc.js";

const updateConfig = publicProcedure
  .input(wpConfigZodSchema)
  .mutation(async ({ input }) => {
    WpConfig.findOneAndUpdate({ businessId: input.businessId }, input, {
      upsert: true,
      new: true,
    })
      .then((result) => {
        console.log("wpConfig result", result);
        return result;
      })
      .catch((error) => {
        console.log("wpConfig error", error);
        return error;
      });
  });

const getConfigInput = wpConfigZodSchema.pick({ businessId: true });

const getConfig = publicProcedure
  .input(getConfigInput)
  .query(async ({ input }) => {
    WpConfig.findOne({ businessId: input.businessId })
      .then((result) => {
        console.log("wpConfig result", result);
        return result;
      })
      .catch((error) => {
        console.log("wpConfig error", error);
        return error;
      });
  });

const getAllConfigs = publicProcedure.input(z.null()).query(async () => {
  const data = await WpConfig.find({});
  console.log("data: ", data);
  return data;
});

export { getAllConfigs, getConfig, updateConfig };
