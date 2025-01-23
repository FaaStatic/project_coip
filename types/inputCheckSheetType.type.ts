import moment from 'moment';
import { z } from 'zod';

const equipmentModelSchema = z
  .object({
    id: z.string().min(1, { message: 'Field id Must Filled!' }),
    unitCode: z.string().min(1, { message: 'Field Unit Code Must be Filled!' }),
    serialNumber: z.string().optional(),
    unitModel: z
      .string()
      .min(1, { message: 'Field Unit Model Must be Filled!' })
      .refine((value) => value !== 'New Form Excavator', {
        message: 'Field Unit Model Must be Filled!',
      })
      .refine((value) => value !== 'New Form Unit', {
        message: 'Field Unit Model Must be Filled!',
      }),
    smr: z.number().min(1, { message: 'Field SMR Must be Filled!' }),
    type: z.string().optional(),
    isProductUT: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!data.isProductUT) {
      if (data.serialNumber.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Serial number is required when unit is non UT-product!',
          path: ['serialNumber'],
        });
      }
    }
  });
const equipmentModelSchemaErrors = z.object({
  id: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  unitCode: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  serialNumber: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  unitModel: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  smr: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  type: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  isProductUT: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
});

const UnitListSchema = z.object({
  id: z.union([z.string(), z.number()]),
  jobId: z.string().default(''),
  equipmentId: z.string().default(''),
  open: z.boolean().optional().default(false),
  operatorName: z.string().min(1, { message: 'Field Operating Name Must Filled!' }).default(''),
  isExcavator: z.boolean().default(true),
  equipment: equipmentModelSchema.default({}),
});
const UnitListSchemaErrors = z.object({
  id: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  jobId: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  equipmentId: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  open: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  operatorName: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  isExcavator: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  equipment: equipmentModelSchemaErrors.default({}),
});

const CheckSheetDataSchema = z
  .object({
    id: z.string().default(''),
    jobId: z.string().default(''),
    sector: z.string().default(''),
    parameter: z.string().default(''),
    assessmentArea: z.string().default(''),
    unitApplication: z.string().default(''),
    klausul: z.string().default(''),
    description: z.string().default(''),
    operationStandard: z.array(z.string()).default([]),
    guidance: z.array(z.string()).default([]),
    configScore: z.array(z.number()).optional(),
    score: z
      .number()
      .refine((value) => value !== 0, {
        message: 'Please select the score',
      })
      .default(0),
    weight: z.number().default(0),
    sequence: z.number().default(0),
    measurement: z.string().optional().default(''),
    isSync: z.boolean().optional().default(false),
    comment: z.string().optional().default(''),
    recommendation: z.string().optional().default(''),
    image: z.string().min(1, { message: 'Image is required when score is below 4' }).default(''),
    linkVideo: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.score < 4) {
      if (!data.comment || data.comment.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Comment is required when score is below 4 & minimal 3 character for filled comment',
          path: ['comment'],
        });
      }
      if (!data.recommendation || data.recommendation.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Recommendation is required when score is below 4 & minimal 3 character for filled recomendation',
          path: ['recommendation'],
        });
      }
      if (!data.image || data.image.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Image is required when score is below 4',
          path: ['image'],
        });
      }
    }
  });
const CheckSheetDataErrosSchema = z.object({
  id: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  jobId: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  sector: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  parameter: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  assessmentArea: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  unitApplication: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  klausul: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  description: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  operationStandard: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  guidance: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  configScore: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  score: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  weight: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  sequence: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  measurement: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  isSync: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  comment: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  recommendation: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  image: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  linkVideo: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
});

const dataItemForm = z.object({
  id: z.string(),
  jobId: z.string(),
  desc: z.string(),
  data: z.array(CheckSheetDataSchema),
});
const dataItemErrorsForm = z.object({
  id: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  jobId: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  desc: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  data: z.array(CheckSheetDataErrosSchema),
});

export const checkSheetInputTypeSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  value: z.string(),
  data: z.array(dataItemForm),
});
export const checkSheetInputTypeErrorSchema = z
  .record(
    z
      .object({
        id: z.object({
          message: z.string().optional(), // Custom error message
          type: z.string().optional(), // Type of error (required, pattern, etc.)
        }),
        title: z.object({
          message: z.string().optional(), // Custom error message
          type: z.string().optional(), // Type of error (required, pattern, etc.)
        }),
        value: z.object({
          message: z.string().optional(), // Custom error message
          type: z.string().optional(), // Type of error (required, pattern, etc.)
        }),
        data: z.array(dataItemErrorsForm),
      })
      .optional()
  )
  .default({});

const cheksheetUnionType = z.record(checkSheetInputTypeSchema);

export const jobIdentitySchema = z.object({
  start_hour: z
    .string()
    .min(1, { message: 'Field Start Date Must Filled!' })
    .refine((value) => moment(value).isValid(), {
      message: 'Invalid date or required Date',
    })
    .default(''),
  averageSpeed: z.number().min(1, { message: 'Field average speed is required' }).default(0),
  end_hour: z
    .string()
    .min(1, { message: 'Field End Date Must Filled!' })
    .refine((value) => moment(value).isValid(), {
      message: 'Invalid date or required date',
    })
    .default(''),
  location: z.string().min(1, { message: 'Field Location Must Filled!' }).default(''),
  latitude: z
    .number()
    .min(-90, { message: 'Field Latitude Must Filled!' })
    .max(90, { message: 'Field Latitude Must Filled!' })
    .refine((value) => value !== 0, {
      message: 'Latitude and longitude must be filled',
    })
    .default(0),
  longitude: z
    .number()
    .min(-180, { message: 'Field Longitude Must Filled!' })
    .max(180, { message: 'Field Longitude Must Filled!' })
    .refine((value) => value !== 0, {
      message: 'Latitude and longitude must be filled',
    })
    .default(0),
  excavator_list: z.array(UnitListSchema),
  unit_list: z.array(UnitListSchema).default([]).optional(),
});

const jobIdentityErrorSchema = z.object({
  start_hour: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  averageSpeed: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  end_hour: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  location: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  latitude: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  longitude: z.object({
    message: z.string().optional(), // Custom error message
    type: z.string().optional(), // Type of error (required, pattern, etc.)
  }),
  excavator_list: z.array(UnitListSchemaErrors),
  unit_list: z.array(UnitListSchemaErrors).default([]).optional(),
});
const jobIdentityErrorTypeSchema = z.object({
  job_identity: jobIdentityErrorSchema.optional(), // job_identity is either undefined or a jobIdentityErrorsType
});

export const inputChecksheetSchema = z.record(
  z.union([jobIdentitySchema, checkSheetInputTypeSchema])
);

export const schemaCheckshettSubmit = z.object({
  checksheetValues: z.array(
    z.object({
      id: z.string(),
      jobId: z.string(),
      sector: z.string(),
      parameter: z.string(),
      assessmentArea: z.string(),
      unitApplication: z.string(),
      klausul: z.string(),
      description: z.string(),
      operationStandard: z.array(z.string()),
      guidance: z.array(z.string()),
      score: z.array(z.number()),
      weight: z.number(),
      comment: z.string(),
      attachment: z.string(),
      sequence: z.number(),
    })
  ),
});

export type UnitList = z.infer<typeof UnitListSchema>;

export type checkInputType = z.infer<typeof checkSheetInputTypeSchema>;

export type checkInputErrorsType = z.infer<typeof checkSheetInputTypeErrorSchema>;

export type jobIdentityType = z.infer<typeof jobIdentitySchema>;

export type jobIdentityErrorsType = z.infer<typeof jobIdentityErrorTypeSchema>;

export type checksheetFormType = z.infer<typeof cheksheetUnionType>;

export type inputChecksheetType = z.infer<typeof inputChecksheetSchema>;

export type dataCheckSheet = z.infer<typeof CheckSheetDataSchema>;

export interface CheckInputType {
  inputState: inputChecksheetType;
  saveItem: (key: string, updates: number | string) => void;
  saveAllItem: (value: inputChecksheetType | any) => void;
  saveListItemDataCheckWorking: (key: string, index: number, item: any) => void;
  saveListItemUnitList: (index: number, item: any) => void;
  updateListItemExcavator: (index: number, item: any) => void;
  updateListItemUnit: (index: number, item: any) => void;
}
