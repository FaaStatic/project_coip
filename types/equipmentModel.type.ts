import { z } from 'zod';

export const equipmentModelSchemaType = z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  unitModel: z.string().optional(),
  serialNumber: z.string().optional(),
  isProductUT: z.boolean().optional(),
  unitCode: z.string().optional(),
  smr: z.number().optional(),
  createdDate: z.string().optional(),
  updatedDate: z.string().optional(),
});

export type EquipmentScheme = z.infer<typeof equipmentModelSchemaType>;
