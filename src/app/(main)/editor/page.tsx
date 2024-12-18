import { resumeDataInclude } from "@/lib/types";
import ResumeEditor from "./ResumeEditor";
import prisma from "@/lib/prisma";


export const metadata = {
    title: "Design Your Resume",
    description:
        "Here you can edit your resume.",
}
interface PageProps {
    searchParams: Promise<{ resumeId?: string }>;
  }

  

const Page = async({searchParams} : PageProps) => {
    const {resumeId} = await searchParams;

    const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId },
        include: resumeDataInclude,
      })
    : null;



    return (
        <div>
           <ResumeEditor resumeServierData = {resumeToEdit} />
        </div>
    );
}

export default Page;