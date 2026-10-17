import { Link, useParams } from "react-router";
import PageTitle from "../../shared/components/PageTitle";
import { useDiplomaSpecificData } from "../api/quireisDiploma/use-specificDiploma-details";
import { useEffect, useState } from "react";
import type { DiplomaDetails } from "../user/types/iSpecificDiplomaDetails";
import { Ban, Pencil, Trash2, X } from "lucide-react";
import AdminDeleteDiloma from "./AdminDeleteDiloma";

export default function AdmineDiplomaDetails() {
  const { id } = useParams();


  const { data } = useDiplomaSpecificData(id);

  const [deleteDiploma, setDeleteDiploma] = useState(false);

  const [diplomaTitle,setDiplomaTitle] = useState<string | undefined >();

  const [diplomaId,setDiplomaId] = useState<string | undefined>();

  const [diploma, setDiploma] = useState<DiplomaDetails | undefined>();

  useEffect(() => {
    setDiploma(data?.data);
  }, [data]);

  return (
    <>
      <PageTitle>
        {" "}
        Diploma /{" "}
        <span className="text-blue-600">
          {diploma?.payload.diploma.title}
        </span>{" "}
      </PageTitle>
      <div className="flex h-[57px] items-center justify-between bg-white px-3">
        <h1 className="text-[16px] font-semibold text-[#111827]">
          {diploma?.payload.diploma.title}
        </h1>
        <div className="flex items-center gap-2">
          {diploma?.payload.diploma.immutable === false ? (
            <>
              {/* Edit */}
              <Link
                to={`/exams/adminDiploma/edit/${id}`}
                type="button"
                className="flex h-[36px] items-center gap-2 bg-[#2563FF] px-4 text-[14px] font-mono text-white"
              >
                <Pencil size={17} strokeWidth={2} />
                <span>Edit</span>
              </Link>

              {/* Delete */}
              <button
                onClick={()=>{
                  setDeleteDiploma(true)
                  setDiplomaTitle(data?.data.payload.diploma.title);
                  setDiplomaId(data?.data.payload.diploma.id);
                  }}
                  type="button"
                  className="flex cursor-pointer h-[36px] items-center gap-2 bg-[#FF2B2B] px-4 text-[14px] font-mono text-white"
              >
                <Trash2 size={17} strokeWidth={2} />
                <span>Delete</span>
              </button>
              {/* Delete PopUp */}
            {deleteDiploma && 
                    (<AdminDeleteDiloma diplomaId={diplomaId} diplomaTitla={diplomaTitle} deleteDiploma={deleteDiploma} setDeleteDiploma={setDeleteDiploma}/>)
            }
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
                to={"/exams/adminDiploma"}
                type="button"
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 text-[11px] font-medium text-gray-600 transition hover:bg-gray-200"
              >
                <X size={13} strokeWidth={2} />
                Cancel
              </Link>
        </div>
      </div>

      <div className="min-h-screen bg-[#F3F4F6] p-3">
        {/* Header */}

        {/* Content */}
        <div className="mt-3 bg-white p-3">
          {/* Image */}
          <div>
            <p className="mb-1 font-mono text-[12px] text-[#9CA3AF]">Image</p>

            <img
              src={`${diploma?.payload.diploma.image}`}
              alt="AI & ML Development"
              className="h-[260px] w-[260px] object-cover"
            />
          </div>

          {/* Title */}
          <div className="mt-3">
            <p className="mb-1 font-mono text-[12px] text-[#9CA3AF]">Title</p>

            <p className="font-mono text-[14px] text-[#1F2937]">
              {diploma?.payload.diploma.title}
            </p>
          </div>

          {/* Description */}
          <div className="mt-4">
            <p className="mb-1 font-mono text-[12px] text-[#9CA3AF]">
              Description
            </p>

            <p className="max-w-[850px] font-mono text-[13px] leading-[20px] text-[#374151]">
              {diploma?.payload.diploma.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
