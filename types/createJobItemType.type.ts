import { z } from 'zod';

const additionalJob = z.object({
  id: z.string(),
  jobId: z.string().nullable(),
  desc: z.string().nullable(),
  parameter: z.string().nullable(),
});

const jobCardSchema = z.object({
  id: z.string(),
  jobNumber: z.number(),
  status: z.number(),
  plantArea: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  title: z.string(),
  level: z.number(),
  isSync: z.boolean(),
  planExecutionDate: z.string(),
  downTimeStartDate: z.string(),
  downTimeEndDate: z.string(),
  customer: z.string(),
  equipmentIdentities: z.string(),
  additionalJobs: z.array(additionalJob).nullable(),
  job_identity: z.string(),
  form_job: z.string(),
  createdBy: z.string(),
  createdByName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type createJobItemType = z.infer<typeof jobCardSchema>;
