import {
  Ban,
  ExternalLinkIcon,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ExamContext } from "../../../Context/UseContext";
import PageTitle from "../../../shared/components/PageTitle";
import { useDiplomaSpecificData } from "../../api/quireisDiploma/use-specificDiploma-details";
import type { Exam } from "../../user/types/ITests";
import { useQueryQuestions } from './../../api/quireisDiploma/use-quiry-questions';
import type { Question } from "../../user/types/iQuestions";
import AdminExamShowQuestions from "./AdminExamShowQuestions";


export default function AdminExamDetails() {
  const { id } = useParams<{ id: string }>();

  const getdiplomaIdindtoContext = useContext(ExamContext);

  const [examDetals, setExamDetails] = useState<Exam | undefined>()

  const { data: deiplomaDetails } = useDiplomaSpecificData(
    getdiplomaIdindtoContext?.diploma
  );

  const {data: examQuestions} = useQueryQuestions(id)

  const [questions,setQuestions] = useState<Question[] | undefined>();
  
  useEffect(()=>{
    const specificExam = deiplomaDetails?.payload?.diploma?.exams.find(e => e.id === id)
    
    setExamDetails(specificExam);
    setQuestions(examQuestions)
  },[deiplomaDetails, getdiplomaIdindtoContext?.diploma, examQuestions])
  

  return (
    <>
      <PageTitle>
        {" "}
        Diploma /{" "}
        <span className="text-blue-600">{examDetals?.title}</span>{" "}
      </PageTitle>

      <div className="flex h-[57px] items-center justify-between bg-white px-3">
        <h1 className="text-[16px] font-semibold text-[#111827]">
          {examDetals?.title}
        </h1>

        <div className="flex items-center gap-2">
          {examDetals?.immutable === false ? (
            <>
              {/* Edit */}
              <Link
                to={``}
                type="button"
                className="flex h-[36px] items-center gap-2 bg-[#2563FF] px-4 text-[14px] font-mono text-white"
              >
                <Pencil size={17} strokeWidth={2} />
                <span>Edit</span>
              </Link>

              {/* Delete */}
              <button
                type="button"
                className="flex h-[36px] cursor-pointer items-center gap-2 bg-[#FF2B2B] px-4 text-[14px] font-mono text-white"
              >
                <Trash2 size={17} strokeWidth={2} />
                <span>Delete</span>
              </button>
            </>
          ) : (
            <>
              {/* Immutable */}
              <button
                type="button"
                className="flex h-[36px] items-center gap-2 bg-[#E5E7EB] px-4 text-[14px] font-mono text-[#374151]"
              >
                <Ban size={16} strokeWidth={2} />
                <span>Immutable</span>
              </button>
            </>
          )}

          {/* Cancel */}
          <Link
            to={"/exams/adminExams"}
            type="button"
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 text-[11px] font-medium text-gray-600 transition hover:bg-gray-200"
          >
            <X size={13} strokeWidth={2} />
            Cancel
          </Link>
        </div>
      </div>

      <div className="min-h-screen bg-[#F3F4F6] p-3">
        <div className="mt-3 bg-white p-3">
          {/* Image */}
          <div>
            <p className="mb-1 font-mono text-[12px] text-[#9CA3AF]">
              Image
            </p>

            <img
              src={examDetals?.image}
              alt={examDetals?.title}
              className="h-[260px] w-[260px] object-cover"
            />
          </div>

          {/* Title */}
          <div className="mt-3">
            <p className="mb-1 font-mono text-[12px] text-[#9CA3AF]">
              Title
            </p>

            <p className="font-mono text-[14px] text-[#1F2937]">
              {examDetals?.title}
            </p>
          </div>

          {/* Description */}
          <div className="mt-4">
            <p className="mb-1 font-mono text-[12px] text-[#9CA3AF]">
              Description
            </p>

            <p className="max-w-[850px] font-mono text-[13px] leading-[20px] text-[#374151]">
              {examDetals?.description}
            </p>
          </div>

          {/* Diploma */}
          <div className="mt-4">
            <p className="mb-1 font-mono text-[12px] text-[#9CA3AF]">
              Diploma
            </p>

            <p className="flex max-w-[850px] gap-2 font-mono text-[13px] leading-[20px] text-[#374151]">
              {deiplomaDetails?.payload?.diploma?.title}
              <ExternalLinkIcon size={18} />
            </p>
          </div>

          {/* Duration */}
          <div className="mt-4">
            <p className="mb-1 font-mono text-[12px] text-[#9CA3AF]">
              Duration
            </p>

            <p className="max-w-[850px] font-mono text-[13px] leading-[20px] text-[#374151]">
              {examDetals?.duration}
            </p>
          </div>

          {/* Number Of Questions */}
          <div className="mt-4">
            <p className="mb-1 font-mono text-[12px] text-[#9CA3AF]">
              No .of Questions
            </p>

            <p className="max-w-[850px] font-mono text-[13px] leading-[20px] text-[#374151]">
              {examDetals?.questionsCount}
            </p>
          </div>
        </div>
      </div>


      <AdminExamShowQuestions examID={id} />
    </>
  );
}