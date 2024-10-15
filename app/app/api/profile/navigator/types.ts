import type { z } from "zod";
import { navigatorSchema } from "@/app/api/profile/navigator";
import { navigatorParamsSchema } from "@/app/api/profile/navigator/schemas";

export type TNavigator = z.infer<typeof navigatorSchema>;
export type TNavigatorParams = z.infer<typeof navigatorParamsSchema>;
