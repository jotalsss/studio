import { z } from "zod";

export const TransactionFormSchema = z.object({
  description: z.string().min(2, {
    message: "A descrição deve ter pelo menos 2 caracteres.",
  }).max(100, {
    message: "A descrição não deve exceder 100 caracteres.",
  }),
  amount: z.number({invalid_type_error: "O valor deve ser um número."}).positive({
    message: "O valor deve ser positivo.",
  }),
  date: z.date({
    required_error: "A data é obrigatória.",
  }),
  category: z.string().optional(),
});
