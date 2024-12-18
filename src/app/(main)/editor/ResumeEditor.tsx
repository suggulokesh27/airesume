"use client";


import BreadcrumbMethod from "./Breadcrumb";
import { useSearchParams } from "next/navigation";
import { steps } from "./step";
import { useEffect, useState } from "react";
import { ResumeValue } from "@/lib/validationForm";
import ResumeTemplete from "./ResumeTemplete";
import Footer from "./Footer";
import { cn, mapToResumeValues } from "@/lib/utils";
import useUnLoadPage from "@/hooks/useUnLoadPage";
import useAutoSave from "./useAutoSave";
import { ResumeServerData } from "@/lib/types";

interface ResumeEditorFormType {
    resumeServierData: ResumeServerData | null;
}

const ResumeEditor = ({resumeServierData} : ResumeEditorFormType) => {
    const searchParms = useSearchParams();
    const [resumeData, setResumeData] = useState<ResumeValue>(
        resumeServierData ? mapToResumeValues(resumeServierData) : {});
    const [showSmResumePreview, setShowSmResumePreview] = useState(false);

    const currentStep = searchParms.get("step") || steps[0].key;

    const setStep = (step: string) => {
        const newSearchParams = new URLSearchParams(searchParms);
        newSearchParams.set("step", step);
        window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    };

    const FormComponent = steps.find((step) => step.key === currentStep)?.component;

    const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0
    });

    const { isSaving, hasChanged} = useAutoSave(resumeData);

    useUnLoadPage(hasChanged);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Attach the resize event listener
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isSmallScreen = windowSize.width < 768;

    useEffect(() => {
        if (!isSmallScreen) {
            setShowSmResumePreview(false);
        } 
    }, [isSmallScreen]);
    return (
        <div className="flex flex-col mt-4 gap-10 items-center">
            <main className="w-full p-6 shadow-lg rounded-lg h-[60vh] flex flex-col md:flex-row gap-4">
                <div className={cn("w-full md:w-1/2 space-y-6 pb-32 overflow-y-auto", showSmResumePreview && "hidden")}>
                    <h5 className="text-xl font-semibold text-gray-800 text-center dark:text-white">
                        Edit Your Resume
                    </h5>
                    <BreadcrumbMethod currectStep={currentStep} setCurrectStep={setStep} />
                    {FormComponent && (
                        <FormComponent
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                        />
                    )}
                </div>

                <div className="hidden md:block w-[1px] bg-gray-200"></div>

                <div className={cn("w-full overflow-y-auto", showSmResumePreview ? "block md:hidden" : "hidden")}>
                    <h6 className="text-lg font-medium text-gray-700 mb-4 dark:text-white">
                        Resume Preview
                    </h6>
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <ResumeTemplete resumeData={resumeData} />
                    </div>
                </div>

                {!isSmallScreen && (
                    <div className={cn("w-full md:w-1/2 overflow-y-auto", showSmResumePreview ? "hidden" : "md:block")}>
                        <h6 className="text-lg font-medium text-gray-700 mb-4 dark:text-white">
                            Resume Preview
                        </h6>
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <ResumeTemplete resumeData={resumeData} />
                        </div>
                    </div>
                )}


            </main>

            <Footer
                setCurrentStep={setStep}
                currentStep={currentStep}
                showSmResumePreview={showSmResumePreview}
                setShowSmResumePreview={setShowSmResumePreview}
                isSaving={isSaving}
            />
        </div>
    );
};

export default ResumeEditor;
