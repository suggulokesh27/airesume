"use server"

import { canCreateResume } from "@/lib/perimission";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { resumeSchema, ResumeValue } from "@/lib/validationForm"
import { auth } from "@clerk/nextjs/server";


const ResumeService = async (values : ResumeValue) => {
    const {id} = values;

    const {  workExperiences, educations, ...resumeValue } =
    resumeSchema.parse(values);

    const { userId } = await auth();

    if (!userId) {

      throw new Error("User not authenticated");
    }


  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!id) {
    const resumeCount = await prisma.resume.count({ where: { userId } });

    if (!canCreateResume(subscriptionLevel, resumeCount)) {
      throw new Error(
        "Maximum resume count reached for this subscription level",
      );
    }
  }
  
    const existResume = id ? await prisma.resume.findUnique({
        where : { id,userId}
    }) : null;

    if (id && !existResume) {
        throw new Error("Resume not found");
      }

      if(id) {
        return prisma.resume.update({
          where: { id },
          data: {
            ...resumeValue,
            workExperiences: {
              deleteMany: {},
              create: workExperiences?.map((exp) => ({
                ...exp,
                startDate: exp.startDate ? new Date(exp.startDate) : undefined,
                endDate: exp.endDate ? new Date(exp.endDate) : undefined,
              })),
            },
            educations: {
              deleteMany: {},
              create: educations?.map((edu) => ({
                ...edu,
                startDate: edu.startDate ? new Date(edu.startDate) : undefined,
                endDate: edu.endDate ? new Date(edu.endDate) : undefined,
              })),
            },
            updateAt: new Date(),
          },
        });
      } else {
        return prisma.resume.create({
          data: {
            ...resumeValue,
            userId,
            workExperiences: {
              create: workExperiences?.map((exp) => ({
                ...exp,
                startDate: exp.startDate ? new Date(exp.startDate) : undefined,
                endDate: exp.endDate ? new Date(exp.endDate) : undefined,
              })),
            },
            educations: {
              create: educations?.map((edu) => ({
                ...edu,
                startDate: edu.startDate ? new Date(edu.startDate) : undefined,
                endDate: edu.endDate ? new Date(edu.endDate) : undefined,
              })),
            },
          },
        });
      }
}

export default ResumeService;