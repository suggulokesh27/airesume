import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Textarea } from "@/components/ui/textarea";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useEffect } from "react";
  import { useForm } from "react-hook-form";
  import { SummaryInfoValue, summaryInfoSchema } from "@/lib/validationForm";
import { ResumeEditorFormType } from "@/lib/types";
  
  export default function SummaryForm(
    {resumeData,setResumeData}:ResumeEditorFormType
  ) {
    const form = useForm<SummaryInfoValue>({
      resolver: zodResolver(summaryInfoSchema),
      defaultValues: {
        summary: resumeData?.summary || "",
      },
    });
  
    useEffect(() => {
      const { unsubscribe } = form.watch(async (values) => {
        const isValid = await form.trigger();
        if (!isValid) return;
        setResumeData({ ...resumeData, ...values });
      });
      return unsubscribe;
    }, [form, resumeData, setResumeData]);
  
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold">Professional summary</h2>
          <p className="text-sm text-muted-foreground">
            Write a short introduction for your resume or let the AI generate one
            from your entered data.
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-3">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Professional summary</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="A brief, engaging text about yourself"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  }