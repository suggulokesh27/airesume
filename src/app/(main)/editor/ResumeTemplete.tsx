import { ResumeValue } from "@/lib/validationForm";
import Link from "next/link";


export interface ResumeTempleteProps {
    resumeData: ResumeValue,

}
const ResumeTemplete = ({ resumeData }: ResumeTempleteProps) => {
    return (
      <>
        {resumeData && (
          <div className="max-w-[794px] h-[1123px] mx-auto p-6 bg-white shadow-md font-sans" id="resume-content"
>
            {resumeData?.firstName && (
              <header className="text-center mb-6">
                <h1 className="text-3xl font-bold uppercase">
                  {resumeData?.firstName + " " + resumeData?.lastName}
                </h1>
                <p className="text-gray-700 font-medium mt-2">
                  <span className="font-semibold">
                    {resumeData?.city
                      ? resumeData?.country
                        ? resumeData?.city + ", " + resumeData?.country
                        : resumeData?.city
                      : resumeData?.country || ""}
                  </span>{" "}
                  | {resumeData?.phone} |{" "}
                  <Link href="mailto:suggulokesh27@gmail.com" className="text-blue-500 underline">
                    {resumeData?.email}
                  </Link>{" "}
                </p>
              </header>
            )}
  
            {resumeData?.summary && (
              <section>
                <h2 className="text-lg font-semibold bg-gray-200 p-2">OBJECTIVE</h2>
                <p className="text-gray-700 mt-2 leading-relaxed">{resumeData?.summary}</p>
              </section>
            )}
  
            {((resumeData?.workExperiences ?? []).length > 0) && (
              <section>
                <h2 className="text-lg font-semibold bg-gray-200 p-2">Work Experience</h2>
                <div className="mt-4 space-y-4">
                  {resumeData?.workExperiences?.map((exp, index) => (
                    <div key={index}>
                      <h3 className="font-bold">{exp?.position}</h3>
                      <p className="text-gray-700 font-medium">{exp?.company}</p>
                      <p className="text-sm text-gray-500">{exp?.startDate} - {exp?.endDate ? exp?.endDate : "Present"}</p>
                      <ul className="list-disc list-inside text-gray-700 mt-2">
                        {exp?.description}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
  
            {((resumeData?.educations ?? []).length > 0) && (
              <section className="mt-6">
                <h2 className="text-lg font-semibold bg-gray-200 p-2">Education</h2>
                <div className="mt-2 space-y-2">
                  {resumeData?.educations?.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-bold">{edu?.degree}</h3>
                      <p className="text-gray-700 font-medium">{edu?.school}</p>
                      <p className="text-sm text-gray-500">{edu?.startDate} - {edu?.endDate ? edu?.endDate : "Present"}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
  
            {resumeData?.skills && resumeData?.skills.length > 0 && (
              <section className="mt-6">
                <h2 className="text-lg font-semibold bg-gray-200 p-2">Skills</h2>
                <div className="flex flex-wrap gap-2 mt-4">
                  {resumeData?.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </>
    );
  };
  
  export default ResumeTemplete;
  