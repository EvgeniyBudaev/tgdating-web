import type { z } from "zod";
import { imageSchema } from "@/app/api/image/schemas";

export type TImage = z.infer<typeof imageSchema>;
