import { z } from 'zod';

const loginFormSchema = z.object({
  userName: z.string(),
  password: z.string(),
});

const userSchema = z.object({
  id: z.any(),
  key_api: z.union([z.string(), z.undefined()]),
  firstname: z.union([z.string(), z.undefined()]),
  lastname: z.union([z.string(), z.undefined()]),
  typeKey: z.union([z.string(), z.undefined()]),
  position: z.union([z.string(), z.undefined()]),
  level: z.union([z.number(), z.undefined()]),
  email: z.union([z.string(), z.undefined()]),
  photo: z.union([z.string(), z.null(), z.undefined()]),
  branchSupportArea: z.union([z.string(), z.null(), z.undefined()]),
  contactNumber: z.union([z.string(), z.null(), z.undefined()]),
  customerCode: z.union([z.string(), z.null(), z.undefined()]),
  expiresIn: z.union([z.number(), z.null(), z.undefined()]),
  refreshToken: z.union([z.string(), z.null(), z.undefined()]),
  isInternal: z.boolean().nullable(),
});

export type UserTypeSchema = z.infer<typeof userSchema>;
export type LoginUserTypeSchema = z.infer<typeof loginFormSchema>;
