import { Prisma } from "@prisma/client";
import { ResumeValue } from "./validationForm"

 export interface ResumeEditorFormType {
    resumeData : ResumeValue,
    setResumeData : (resmeData : ResumeValue) => void, 
}

export const resumeDataInclude = {
    workExperiences: true,
    educations: true,
  } satisfies Prisma.ResumeInclude;
  
  export type ResumeServerData = Prisma.ResumeGetPayload<{
    include: typeof resumeDataInclude;
  }>;