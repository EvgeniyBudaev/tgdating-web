import type { z } from "zod";
import { navigatorSchema, updateNavigatorParamsSchema } from "@/app/api/navigator/updateNavigator/schemas";

export type TUpdateNavigatorParams = z.infer<typeof updateNavigatorParamsSchema>;
export type TNavigator = z.infer<typeof navigatorSchema>;
