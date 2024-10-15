import { getProfileDetail } from "./domain";
import { profileDetailSchema, profileDetailParamsSchema } from "./schemas";
import type { TProfileDetailParams, TProfileDetail } from "./types";

export {
  profileDetailSchema,
  getProfileDetail,
  profileDetailParamsSchema,
  type TProfileDetailParams,
  type TProfileDetail,
};
