"use client";

import { ResumeServerData } from "@/lib/types";
import { formatDate } from "date-fns";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { deleteResumeService } from "./deleteResumeService";
import { useToast } from "@/hooks/use-toast";
import ResumeTemplete from "../editor/ResumeTemplete";
import { mapToResumeValues } from "@/lib/utils";

interface ResumeItemProps {
    resume: ResumeServerData;
}

export default function ResumeCard({ resume }: ResumeItemProps) {
    const wasUpdated = resume.updateAt !== resume.createAt;
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    return (
        <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
            <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                onClick={() => setDeleteModalOpen(true)}
            >
                <Trash2 size={20} />
            </button>
            <div className="space-y-3">
                <Link href={`/editor?resumeId=${resume.id}`} className="inline-block w-full text-center">
                    <p className="line-clamp-1 font-semibold">{resume.title || "No title"}</p>
                    {resume.description && <p className="line-clamp-2 text-sm">{resume.description}</p>}
                    <p className="text-xs text-muted-foreground">
                        {wasUpdated ? "Updated" : "Created"} on {formatDate(resume.updateAt, "MMM d, yyyy h:mm a")}
                    </p>
                    <div
                        className="relative inline-block w-full h-[300px] overflow-auto"
                    >
                        <ResumeTemplete
                            resumeData={mapToResumeValues(resume)}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                    </div>
                </Link>
            </div>
            <DeleteConfirmationDialog
                open={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                // onConfirm={handleDelete}
                resumeId={resume.id}
            />
        </div>
    );
}
interface DeleteConfirmationDialogProps {
    resumeId: string;
    open: boolean;
    onClose: (open: boolean) => void;
}

function DeleteConfirmationDialog({
    resumeId,
    open,
    onClose,
}: DeleteConfirmationDialogProps) {
    const { toast } = useToast();

    const [isPending, startTransition] = useTransition();

    async function handleDelete() {
        startTransition(async () => {
            try {
                await deleteResumeService(resumeId);
                onClose(false);
            } catch (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    description: "Something went wrong. Please try again.",
                });
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete resume?</DialogTitle>
                    <DialogDescription>
                        This will permanently delete this resume. This action cannot be
                        undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={handleDelete}>
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                    <Button variant="secondary" onClick={() => onClose(false)}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}