import { z } from 'zod';

export const uploadCreateJobs = z.object({
  id: z.string(),
  number: z.string(),
  status: z.string(),
  plantArea: z.string(),
  planExecutionDate: z.string(),
  mainJob: z.string(),
  createdByName: z.string(),
  additionalJobs: z
    .array(z.object({ id: z.string(), jobId: z.string(), desc: z.string() }))
    .default([]),
});

export type uploadCreateJobType = z.infer<typeof uploadCreateJobs>;
