import PersonalInfoForm from "./form/PersonalInfoForm"
import GeneralInfoForm from "./form/GeneralInfoForm"
import React from "react"
import WorkExperienceForm from "./form/WorkExpInfo"
import EducationForm from "./form/EducationInfoForm"
import SummaryForm from "./form/SummaryInfoForm"
import SkillsForm from "./form/SkillInfoForm"
import { ResumeEditorFormType } from "@/lib/types"

export const steps : {
    title: string,
    component: React.ComponentType<ResumeEditorFormType>,
    key: string
}[] = [
    {
        title: "General Info",
        component: GeneralInfoForm,
        key: "general-info"
    },
    {
        title: "Personal Info",
        component: PersonalInfoForm,
        key: "personal-info"
    },
    {
        title: "Work Experience",
        component: WorkExperienceForm,
        key: "work-experience-info"
    },
    {
        title: "Education",
        component: EducationForm,
        key: "education-info"
    },
    {
        title: "Skills",
        component: SkillsForm,
        key: "skills-info"
    },
    {
        title: "Summary",
        component: SummaryForm,
        key: "summary-info"
    },
]