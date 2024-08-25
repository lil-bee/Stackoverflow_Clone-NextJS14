"use client";

import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AnswerSchema } from "@/lib/validation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTheme } from "@/context/ThemeProvider";
import { createAnswer } from "@/lib/actions/answer.action";
import { toast } from "@/components/ui/use-toast";

interface Props {
  question: string;
  questionId: string;
  authorId: string;
}

const Answer = ({ question, questionId, authorId }: Props) => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAI, setIsSubmittingAI] = useState(false);
  const { mode } = useTheme();
  const pathname = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AnswerSchema>) {
    setIsSubmitting(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await createAnswer({
        content: values.answer,
        question: JSON.parse(questionId),
        author: JSON.parse(authorId),
        path: pathname,
      });

      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;

        editor.setContent("");
      }
      return toast({
        title: "Submit Answer Successful",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const formatBoldText = (text: string): string => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  const generateAIAnswer = async () => {
    if (!authorId) return;

    setIsSubmittingAI(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({ question }),
      });

      const aiAnswer = await response.json();

      const formattedAnswer = formatBoldText(
        aiAnswer.reply.replace(/\n/g, "<br />")
      );

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formattedAnswer);
      }
      return toast({
        title: "Success Generate Answer",
      });
    } catch (error) {
      console.log(error);
      return toast({
        title: `Error : ${error}`,
      });
    } finally {
      setIsSubmittingAI(false);
    }
  };
  return (
    <>
      <div className="mt-14">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <h4 className="paragraph-semibold text-dark400_light800">
            Write your answer here
          </h4>
          <Button
            onClick={generateAIAnswer}
            className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          >
            {isSubmittingAI ? (
              <>Generating...</>
            ) : (
              <>
                <Image
                  src="/assets/icons/stars.svg"
                  alt="star"
                  width={12}
                  height={12}
                  className="object-contain"
                />
                Generate AI Answer
              </>
            )}
          </Button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 flex w-full flex-col gap-10"
          >
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormControl className="mt-3.5">
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                      onInit={(_evt, editor) => {
                        // @ts-ignore
                        editorRef.current = editor;
                      }}
                      onBlur={field.onBlur}
                      onEditorChange={(content) => field.onChange(content)}
                      initialValue=""
                      init={{
                        height: 350,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "codesample",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                        ],
                        toolbar:
                          "undo redo | " +
                          "codesample | bold italic forecolor | alignleft aligncenter |" +
                          "alignright alignjustify | bullist numlist",
                        content_style: `body {  font-family: "Inter", sans-serif; font-size:16px }`,
                        skin: mode === "dark" ? "oxide-dark" : "oxide",
                        content_css: mode === "dark" ? "dark" : "light",
                      }}
                    />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="primary-gradient w-fit !text-light-900"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Answer;
