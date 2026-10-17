import { Link, useParams } from "react-router"
import { useGetQuestionAndAnswers } from "../../api/quireisDiploma/use-get-questionAndAnswers";
import { Ban, Pencil, Trash2 } from "lucide-react";
import PageTitle from "../../../shared/components/PageTitle";
import { useExamDetails } from "../../api/quireisDiploma/use-specific-exam";
import AdminDeleteDiloma from "../AdminDeleteDiloma";
import { useState } from "react";

export default function QuestionDetails() {

  const {id} = useParams();

  const {data} = useGetQuestionAndAnswers(id);

  const [deleteDiploma, setDeleteDiploma] = useState(false);
  
  const {data: examDetails} = useExamDetails(data?.data.payload.question.examId);  

  return (

    <div >
      <div className="bg-white p-2">
        <div className="pb-5">
          <PageTitle > Exam  / {examDetails?.payload.exam.title} / Question / <span className="text-blue-600"> {data?.data.payload.question.text} </span></PageTitle>
        </div>

        <div
          className="
            w-[1078px]
            h-[72px]
            flex
            items-center
            justify-between
            border-t
            border-gray-200
            px-6
            py-[6px]
          "
        >
          <div>
            {/* Question Title */}
            <h1
              className="
                w-[417px]
                h-[22px]
                font-inter
                font-semibold
                text-[18px]
                leading-[100%]
                tracking-[0px]
                flex
                items-center
              "
            >
              {data?.data.payload.question.text} ?
            </h1>

            <p className="font-inter font-normal text-[14px] leading-none tracking-normal align-middle text-[#9CA3AF]">Exam: {examDetails?.payload.exam.title}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {data?.data.payload.question.immutable === false ? 
            
            <div className="flex gap-3">
              <Link
                to={`/exams/adminAddQuestion/${id}`}
                className="
                  h-9
                  px-3
                  flex
                  items-center
                  gap-1.5
                  rounded-sm
                  bg-blue-600
                  text-white
                  text-sm
                  font-medium
                  hover:bg-blue-700
                "
              >
                <Pencil size={14} />
                Edit
              </Link>

              <button
                className="
                  h-9
                  px-3
                  flex
                  items-center
                  gap-1.5
                  rounded-sm
                  bg-red-600
                  text-white
                  text-sm
                  font-medium
                  hover:bg-red-700
                  cursor-pointer
                "
                onClick={()=> setDeleteDiploma(true)}
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div> 
            : 
            <button
              className="
                h-9
                px-3
                flex
                items-center
                gap-1.5
                rounded-sm
                bg-gray-100
                text-gray-600
                text-sm
                font-medium
              "
            >
              <Ban size={14} />
              Immutable
            </button>
            }


          </div>
        </div>
          {deleteDiploma && 
            (<AdminDeleteDiloma diplomaId={id} diplomaTitla={data?.data?.payload?.question?.text} deleteDiploma={deleteDiploma} setDeleteDiploma={setDeleteDiploma} examOrDiploma="Question"/>)
          }
      </div>
      
      <div className="bg-white p-2 mt-5">
        <div className="mt-6">
            <p className="font-inter pb-2 font-normal text-[14px] leading-none tracking-normal align-middle text-[#9CA3AF]">Head Line</p>
            <h2
                className="font-mono font-normal text-[14px] leading-none tracking-normal align-middle text-black">
              {data?.data.payload.question.text} ?
            </h2>
        </div>
        <div className="mt-6">
            <p className="font-inter pb-2 font-normal text-[14px] leading-none tracking-normal align-middle text-[#9CA3AF]">Exam</p>
            <h2
                className="font-mono font-normal text-[14px] leading-none tracking-normal align-middle text-black">
              {examDetails?.payload.exam.title}
            </h2>
        </div>
        <div className="mt-6">
            <p className="font-inter pb-2 font-normal text-[14px] leading-none tracking-normal align-middle text-[#9CA3AF]">Answers</p>
            <h2
                className="font-mono font-normal text-[14px] leading-none tracking-normal align-middle text-black">
              {data?.data.payload.question.answers.length}
            </h2>
        </div>

      </div>
    </div>
  )
}
