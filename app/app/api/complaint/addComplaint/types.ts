import type { z } from "zod";
import {
  addComplaintParamsSchema,
  complaintSchema,
} from "@/app/api/complaint/addComplaint/schemas";

export type TAddComplaintParams = z.infer<typeof addComplaintParamsSchema>;
export type TComplaint = z.infer<typeof complaintSchema>;
