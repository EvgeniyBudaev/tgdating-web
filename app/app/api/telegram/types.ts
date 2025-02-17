import type { z } from "zod";
import { telegramSchema } from "@/app/api/telegram/schemas";

export type TTelegram = z.infer<typeof telegramSchema>;
