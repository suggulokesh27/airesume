import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import ResumeCard from "./ResumeCard";
import { auth } from "@clerk/nextjs/server";
import CreateResumeButton from "./CreateResumeButton";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { canCreateResume } from "@/lib/perimission";


export const metadata = {
    title: "Your Resumes",
    description:
        "Here your resume will be displayed.",
};

const Page = async () => {

    const { userId } = await auth();
    
    if(!userId){
        return null;
    }

    const [resumes, totalCount,subscriptionLevel] = await Promise.all([
        prisma.resume.findMany({
          where: {
            ...(userId ? { userId } : {}),
          },
          orderBy: {
            updateAt: "desc",
          },
          include: resumeDataInclude,
        }),
        prisma.resume.count({
          where: {
            ...(userId ? { userId } : {}), 
          },
        }),
        getUserSubscriptionLevel(userId),
      ]);

    return (
        <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <CreateResumeButton canCreate={canCreateResume(subscriptionLevel, totalCount)} />
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your resumes</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
    );
};

export default Page;
