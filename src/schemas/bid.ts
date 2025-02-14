import * as z from 'zod'

export const BidSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  budgetFrom: z.coerce.number().int().positive().min(5000),
  budgetTo: z.coerce.number().int().positive().min(10000).max(1000000),
  deadlineDays: z.coerce.number().int().positive().min(1),
})
