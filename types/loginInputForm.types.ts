import { z } from 'zod';

export const LoginInputFormType = z.object({
  userName: z.string().min(1, { message: 'Please Fill Username' }),
  password: z.string().min(1, { message: 'Please Fill Password' }),
});

