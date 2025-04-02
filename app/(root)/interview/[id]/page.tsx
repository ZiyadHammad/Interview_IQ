import { redirect } from "next/navigation";
import Image from "next/image";

import { getRandomInterviewCover } from "@/lib/utils";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/general.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import Agent from "@/components/Agent";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser()
  const interview = await getInterviewById(id);

  if (!interview) redirect("/");

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4">
            <Image
              className="rounded-full object-cover size-[40px]"
              src={getRandomInterviewCover()}
              height={40}
              width={40}
              alt="cover image"
            />
            <h3 className="capitalize" >{interview.role} Interview</h3>
          </div>
          <DisplayTechIcons techStack={interview.techstack} />
        </div>
        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize" >{interview.type}</p>
      </div>

      <Agent userName={user?.name || ''} userId={ user?.id } interviewId={id} type='interview' questions={interview.questions} />

    </>
  );
};

export default page;
