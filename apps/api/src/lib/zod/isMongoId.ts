import { Types } from "mongoose";
import { z } from "zod";

const mongoIdSchema = z.custom<Types.ObjectId>().refine((val) => {
  return Types.ObjectId.isValid(val);
});

export default mongoIdSchema;
