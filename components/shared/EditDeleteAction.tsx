"use client";

import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };

  const handleDelete = async () => {
    if (type === "question") {
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });
    } else if (type === "answer") {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });
    }
    toast({
      title: `Success Delete ${type === "question" ? "Question" : "Answer"}`,
    });
  };
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={() => handleEdit()}
        />
      )}

      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={() => {
          toast({
            title: "Are you absolutely sure?",
            description:
              "This action cannot be undone. This will permanently delete and remove your data from our servers.",
            action: (
              <ToastAction
                className="btn-secondary rounded-md px-3 py-1"
                onClick={() => handleDelete()}
                altText="Try again"
              >
                Sure
              </ToastAction>
            ),
            variant: "destructive",
          });
        }}
      />
      <Toaster />
    </div>
  );
};

export default EditDeleteAction;
