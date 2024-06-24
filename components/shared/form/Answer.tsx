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
import { createQuestion } from "@/lib/actions/question.action";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTheme } from "@/context/ThemeProvider";

const Answer = () => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      //   await createQuestion({
      //     title: values.title,
      //     content: values.explanation,
      //     tags: values.tags,
      //     author: JSON.parse(mongoUserId),
      //     path: pathname,
      //   });

      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
      <div>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <h4 className="paragraph-semibold text-dark400_light800">
            Write your answer here
          </h4>
          <Button className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500">
            <Image
              src="/assets/icons/stars.svg"
              alt="star"
              width={12}
              height={12}
              className="object-contain"
            />
            Generate AI Answer
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
                        content_style:
                          "body { font-family:Inter; font-size:16px }",
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
