import { useToast } from "@/hooks/use-toast";
import useDeBounce from "@/hooks/useDeBounce";
import { ResumeValue } from "@/lib/validationForm";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ResumeService from "./ResumeService";
import { Button } from "@/components/ui/button";

export default function useAutoSave(resumeData: ResumeValue) {
  const searchParams = useSearchParams();

  const { toast } = useToast();
  const debouncedSave = useDeBounce(resumeData, 1500);
  const [lastSaving, setLastSaving] = useState(
    structuredClone(resumeData)
  )
  const [error, setError] = useState(false);
  const [isSaving, setIsSaving] = useState(false)

  const [resumeId, setResumeId] = useState(resumeData.id);

  useEffect(() => {
    setError(false);
  }, [debouncedSave]);

  useEffect(() => {

    const save = async () => {
      try {
        setIsSaving(true);
        setError(false);
        const newResumeData = structuredClone(debouncedSave);
        const updatedResume = await ResumeService({
          ...newResumeData,
          id: resumeId,
        });

        setResumeId(updatedResume.id);
        setLastSaving(newResumeData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        setError(true);
        console.error(error);
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="space-y-3">
              <p>Could not save changes.</p>
              <Button
                variant="secondary"
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }
    const hasUserChanged = JSON.stringify(resumeData) !== JSON.stringify(lastSaving);

    if (hasUserChanged && debouncedSave && !isSaving && !error) {
      save();
    }

  }, [debouncedSave, lastSaving, isSaving, error, resumeId, searchParams, toast]);
  return {
    isSaving,
    hasChanged: JSON.stringify(resumeData) !== JSON.stringify(lastSaving)
  };
}