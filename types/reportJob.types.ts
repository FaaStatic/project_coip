import { z } from 'zod';

const reportJobschema = z.object({
  type: z.string(),
  id: z.string(),
  jobId: z.string(),
  coipNumber: z.string(),
  coipReports: z.object({
    type: z.string(),
    id: z.string(),
    unitApplication: z.string(),
    customerLevel: z.number(),
    dataCustomer: z.object({
      type: z.string(),
      id: z.string(),
      customerName: z.string(),
      sector: z.string(),
      location: z.string(),
      spesificLocation: z.object({
        longitude: z.string(),
        latitude: z.string(),
      }),
      approvalName: z.string(),
    }),
    dataJobObserver: z.object({
      type: z.string(),
      id: z.string(),
      observerName: z.string(),
      approvalName: z.string(),
      assignmentId: z.string(),
      planExecutionDate: z.string(),
      coipId: z.string(),
    }),
    dataChart: z.object({
      type: z.string(),
      id: z.string(),
      assessmentAreas: z.array(
        z.object({
          type: z.string(),
          id: z.string(),
          assessmentArea: z.string(),
          score: z.number(),
          percentage: z.number(),
        })
      ),
      trendOperationLevels: z.array(
        z.object({
          type: z.string(),
          id: z.string(),
          monthCustomerLevel: z.string(),
          customerLevel: z.number(),
        })
      ),
      relationshipNames: z.array(z.string()),
    }),
    relationshipNames: z.array(z.string()),
  }),
  parameters: z.array(
    z.object({
      type: z.string(),
      id: z.string(),
      parameter: z.string(),
      assessmentAreas: z.array(
        z.object({
          type: z.string(),
          id: z.string(),
          assessmentArea: z.string(),
          checksheetValues: z.array(
            z.union([
              z.object({
                type: z.string(),
                id: z.string(),
                sector: z.string(),
                unitApplication: z.string(),
                parameter: z.string(),
                assessmentArea: z.string(),
                klausul: z.string(),
                description: z.string(),
                operationStandard: z.array(z.string()),
                guidance: z.array(z.string()),
                scores: z.array(z.number()),
                score: z.number(),
                weight: z.number(),
                finalScore: z.array(z.number()),
                comment: z.string(),
                recommendation: z.string(),
                image: z.string(),
                linkVideo: z.null(),
                sequence: z.number(),
              }),
              z.object({
                type: z.string(),
                id: z.string(),
                sector: z.string(),
                unitApplication: z.string(),
                parameter: z.string(),
                assessmentArea: z.string(),
                klausul: z.string(),
                description: z.string(),
                operationStandard: z.array(z.string()),
                guidance: z.array(z.string()),
                scores: z.array(z.number()),
                score: z.number(),
                weight: z.number(),
                finalScore: z.array(z.number()),
                comment: z.string(),
                recommendation: z.string(),
                image: z.null(),
                linkVideo: z.null(),
                sequence: z.number(),
              }),
            ])
          ),
          relationshipNames: z.array(z.string()),
        })
      ),
      relationshipNames: z.array(z.string()),
    })
  ),
  dataUnitReport: z.object({
    type: z.string(),
    id: z.string(),
    unitModel: z.string(),
    unitCode: z.string(),
    otherUnit: z.array(z.unknown()),
  }),
  relationshipNames: z.array(z.string()),
});

export type reportJobType = z.infer<typeof reportJobschema>;
