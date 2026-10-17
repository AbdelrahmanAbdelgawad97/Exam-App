import {
  ArrowUpDown,
  MoreHorizontal,
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { useQueryQuestions } from "../../api/quireisDiploma/use-quiry-questions";
import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { ExamContext } from "../../../Context/UseContext";
import AdminDeleteDiloma from "../AdminDeleteDiloma";

type Props = {
  examID: string | undefined;
};

export default function AdminExamShowQuestions({ examID }: Props) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const [deleteDiploma, setDeleteDiploma] = useState(false);

  const { data: examQuestions } = useQueryQuestions(examID);

  const [questionID, setQuestionID] = useState<string>();
  const [questionHeadLine, setQuestionHeadLine] = useState<string>();

  const setExamID = useContext(ExamContext);

  examID && setExamID?.setExamID(examID);

  useEffect(() => {}, [examQuestions]);

  return (
    <div className="w-full mx-auto bg-white shadow-sm border border-gray-200 font-sans">
      {/* Header Section */}
      <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
        <h1 className="font-semibold text-base tracking-wide">
          Exam Questions
        </h1>
        <Link
          to={`/exams/adminAddQuestion`}
          className="flex cursor-pointer items-center gap-1 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          <span>Add Questions</span>
        </Link>
      </div>

      {/* Table Header Row */}
      <div className="bg-gray-100 text-gray-700 px-4 py-2.5 flex justify-between items-center border-b border-gray-200 text-xs font-bold tracking-wider uppercase">
        <div>Title</div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-black">
          <span>Sort</span>
          <ArrowUpDown size={14} />
        </div>
      </div>

      {/* Table Body / Rows */}
      <div className="divide-y divide-gray-100">
        {examQuestions?.map((question, index) => (
          <div
            key={index}
            className="px-4 py-3.5 flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-800 text-sm font-mono">
              {index + 1}) {question.text}
            </span>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === index ? null : index)}
                className="p-1 text-gray-500 hover:bg-gray-200 rounded transition-colors"
              >
                <MoreHorizontal size={18} />
              </button>

              {openMenu === index && (
                <div className="absolute right-0 top-8 z-50 w-32 rounded-md border border-gray-200 bg-white shadow-lg">
                  {/* View Question */}
                  <Link
                    to={`/exams/QuestionDetails/${question.id}`}
                    type="button"
                    className="w-full px-3 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Eye size={15} />
                    View
                  </Link>

                  {/* Edite Question */}
                  <Link
                    to={`/exams/adminAddQuestion/${question.id}`}
                    type="button"
                    className="w-full px-3 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Pencil size={15} />
                    Edit
                  </Link>

                  {/* Delete Question */}
                  <button
                    type="button"
                    className="w-full px-3 py-2 flex items-center gap-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setQuestionID(question.id);
                      setQuestionHeadLine(question.text);
                      setDeleteDiploma(true);
                    }}
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              )}
              {deleteDiploma && (
                <AdminDeleteDiloma
                  diplomaId={questionID}
                  diplomaTitla={questionHeadLine}
                  deleteDiploma={deleteDiploma}
                  setDeleteDiploma={setDeleteDiploma}
                  examOrDiploma="Question"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
