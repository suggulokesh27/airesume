import { z } from "zod"

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
    title: optionalString,
    description: optionalString,
});

export type GeneralInfoValue = z.infer<typeof generalInfoSchema>


export const persomalInfoSchema = z.object({
    firstName: optionalString,
    lastName: optionalString,
    email: optionalString,
    phone: optionalString,
    city: optionalString,
    country: optionalString,
})
export type PersonalInfoValue = z.infer<typeof persomalInfoSchema>


export const enducationInfoSchema =  z.object({
    educations: z
      .array(
        z.object({
          degree: optionalString,
          school: optionalString,
          startDate: optionalString,
          endDate: optionalString,
        }),
      )
      .optional(),
  });
  
export type EnducationInfoValue = z.infer<typeof enducationInfoSchema>



export const workExperienceInfoSchema = z.object({
    workExperiences: z
      .array(
        z.object({
          position: optionalString,
          company: optionalString,
          startDate: optionalString,
          endDate: optionalString,
          description: optionalString,
        }),
      )
      .optional(),
  });
  
  export type WorkExperienceInfoValues = z.infer<typeof workExperienceInfoSchema>;


export const skillInfoSchema =z.object({
    skills: z.array(z.string().trim()).optional(),
  });

export type SkillInfoValue = z.infer<typeof skillInfoSchema>

export const summaryInfoSchema = z.object({
    summary : optionalString
}) 

export type SummaryInfoValue = z.infer<typeof summaryInfoSchema>

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...persomalInfoSchema.shape,
  ...enducationInfoSchema.shape,
  ...workExperienceInfoSchema.shape,
  ...skillInfoSchema.shape,
  ...summaryInfoSchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
});

export type ResumeValue = z.infer<typeof resumeSchema> & {
  id?: string; 
};


