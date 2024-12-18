import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusSquareIcon } from "lucide-react";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import ResumeCard from "./ResumeCard";


export const metadata = {
    title: "Your Resumes",
    description:
        "Here your resume will be displayed.",
};

const Page = async () => {

    const [resumes] = await Promise.all([
        prisma.resume.findMany({
            orderBy: {
                updateAt: "desc",
            },
            include: resumeDataInclude,
        })
    ]);

    return (
        <div className="flex flex-col mt-4 gap-10 items-center">
            <Button asChild className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md shadow-md transition-colors duration-200">
                <Link href="/editor" className=" flex text-sm font-medium">
                    <PlusSquareIcon />
                    New Resume
                </Link>
            </Button>

            <div className="pl-4 flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
                {resumes.map((resume) => (
                    <ResumeCard key={resume.id} resume={resume} />
                ))}
            </div>
        </div >
    );
};

export default Page;
