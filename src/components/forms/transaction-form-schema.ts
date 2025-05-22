import { z } from "zod";

export const TransactionFormSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }).max(100, {
    message: "Description must not exceed 100 characters.",
  }),
  amount: z.number({invalid_type_error: "Amount must be a number."}).positive({
    message: "Amount must be positive.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  category: z.string().optional(),
});
