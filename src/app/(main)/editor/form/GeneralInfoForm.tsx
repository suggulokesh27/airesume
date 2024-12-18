import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
import { ResumeEditorFormType } from "@/lib/types";
  import { generalInfoSchema, GeneralInfoValue } from "@/lib/validationForm";
  import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
  import { useForm } from "react-hook-form";
  
  export default function GeneralInfoForm(
    {resumeData,setResumeData}:ResumeEditorFormType
  ) {
    const form = useForm<GeneralInfoValue>({
      resolver: zodResolver(generalInfoSchema),
      defaultValues: {
        title: resumeData?.title || "",
        description: resumeData?.description || "",
      },
    });

    useEffect(() => {
      const { unsubscribe } = form.watch(async (values) => {
        const isValid = await form.trigger();
        if (!isValid) return;
        setResumeData({
          ...resumeData,
          title:values.title,
          description:values.description,
        });
      })
      return unsubscribe
    }, [form, resumeData, setResumeData]);
  
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold">General info</h2>
          <p className="text-sm text-muted-foreground">
            This is only General Information.
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="My cool resume" autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="A resume for my next job" />
                  </FormControl>
                  <FormDescription>
                    Describe what this resume is for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  }