import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { steps } from "./step";
import React from "react";

interface BreadcrumbProps {
    currectStep:string;
    setCurrectStep: (step:string)=>void;
}

const BreadcrumbMethod = ({currectStep, setCurrectStep}:BreadcrumbProps) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {steps.map((step) => (
                    <React.Fragment key={step.key}>
                        <BreadcrumbItem>
                        {step.key === currectStep ? (
                            <BreadcrumbPage>{step.title}</BreadcrumbPage>
                        ):
                        (
                            <BreadcrumbLink asChild>
                                <button onClick={() => setCurrectStep(step.key)}>{step.title}</button>
                            </BreadcrumbLink>
                            
                        )
                        }
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </React.Fragment>
                        
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadcrumbMethod;