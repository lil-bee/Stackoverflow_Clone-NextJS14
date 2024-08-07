import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";
import { getHotQuestion } from "@/lib/actions/question.action";
import { getHotTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
  const result = await getHotQuestion();
  const tagResult = await getHotTags();
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar light-border sticky right-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[330px]">
      <div>
        <h1 className="h3-bold text-dark200_light900">Top Question</h1>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {result.hotQuestions.map((item) => {
            // TODO

            return (
              <Link
                href={`/question/${item._id}`}
                key={item.title}
                className="text-dark300_light900
                flex items-center justify-between gap-[10px]"
              >
                <p className="body-medium text-dark500_light700 max-lg:hidden">
                  {item.title}
                </p>
                <Image
                  src="assets/icons/chevron-right.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-16">
        <h1 className="h3-bold text-dark200_light900">Popular Tags</h1>
        <div className="mt-7 flex flex-col gap-4">
          {tagResult.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
