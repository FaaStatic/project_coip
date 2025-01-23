import { z } from 'zod';

const CustomerType = z.object({
  id: z.string().nullable(),
  userName: z.string().nullable(),
  userCode: z.string().nullable(),
  isChoose: z.boolean().nullable(),
  isActive: z.boolean().nullable(),
});

export type customerListType = z.infer<typeof CustomerType>;
