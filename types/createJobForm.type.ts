import { z } from 'zod';

const childJob = z.object({
  title: z.string().default('').nullable(),
  value: z.string().default('').nullable(),
  id: z.string().default('').nullable(),
  sequence: z.number().nullable(),
  selected: z.boolean().nullable(),
});

const itemJobSchema = z.object({
  title: z.string().default('').nullable(),
  value: z.string().default('').nullable(),
  id: z.string().default('').nullable(),
  sequence: z.number().nullable(),
  selected: z.boolean().nullable(),
  child: z.array(childJob).default([]),
});

const createJobsTypeSchema = z.object({
  assignment_id: z.string().default(''),
  numberJob: z.number().default(0),
  main_title: z.string().default(''),
  date: z.string().default(''),
  plantArea: z.string().default(''),
  status: z.number().default(0),
  unit: z.string().default(''),
  level: z.number().default(0),
  customer: z.string().default(''),
  idCustomer: z.string().default(''),
  customerCode: z.string().default(''),
  createdByName: z.string().default(''),
  main_job: z.array(itemJobSchema).default([]),
  detail_job: z.array(itemJobSchema).default([]),
});

const jobChildSchema = z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  jobType: z.string().optional(),
  sequence: z.number().optional(),
  desc: z.string().optional(),
  createdDate: z.string().optional(),
  updatedDate: z.string().optional(),
  isActive: z.boolean().optional(),
});

const checkSheetJobSchema = z.object({
  id: z.string().optional(),
  typeData: z.string().optional(),
  jobType: z.string().optional(),
  titleMainJob: z.string().optional(),
  childJob: z.array(jobChildSchema).optional(),
  isActive: z.boolean().optional(),
  sequence: z.number().optional(),
  updatedDate: z.string().optional(),
  createdDate: z.string().optional(),
});

export type jobItemSchema = z.infer<typeof itemJobSchema>;
export type createJobType = z.infer<typeof createJobsTypeSchema>;
export type checksheetJobType = z.infer<typeof checkSheetJobSchema>;
