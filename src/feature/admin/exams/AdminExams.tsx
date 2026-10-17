import { ArrowDownAZ, ArrowDownWideNarrow, ArrowUpAZ, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router";
import { cn } from "../../../shared/lib/utils";
import PageTitle from "../../../shared/components/PageTitle";
import { useContext, useDeferredValue, useEffect, useRef, useState } from "react";
import { useAllDiplomas, useAllDiplomasData } from "../../api/quireisDiploma/use-quiry-diploma";
import { useAllDiplomaTest } from "../../api/quireisDiploma/use-quiry-exams";
import type { Exam } from "../../user/types/ITests";
import NotFoundData from "./AdminNotFound";
import type { Daum } from "../../user/types/iDiplomaPayload";
import { ExamContext } from "../../../Context/UseContext";
import AdminDeleteDiloma from "../AdminDeleteDiloma";

export default function AdminExams() {

    const [deleteDiploma, setDeleteDiploma] = useState(false);
    const [diplomaTitle,setDiplomaTitle] = useState<string | undefined >();
    // const [diplomaId,setDiplomaId] = useState<string | undefined>();

    const [pageNumber,setPageNumber] = useState<number>(1);

    const [allDiploma, setAllDiploma] = useState();

    const [allDiplomaExams,SetAllDiplomaExams] = useState<Daum[] | undefined>()

    const {data: payload} = useAllDiplomas(pageNumber);

    const {data: diplomasTitle} = useAllDiplomasData()

    const [search, setSearch] = useState("");

    const [mutableOrNot, setMutableOrNot] = useState<string>("true");

    const [diplomaId, setDiplomaId] = useState<string | undefined>(payload?.data[0].id);
    
    const {data} = useAllDiplomaTest(diplomaId);

    // const [diplomaSetting, setDiplomaSetting] = useState<number>(0);

    const [appearSorted,setAppearSorted] = useState<boolean>(false);

    const [sorted, setSorted ] = useState<string>("");

    const sortRef = useRef<HTMLTableCellElement>(null)

    const [diplomaSetting, setDiplomaSetting] = useState<number | null>(null);

    const setdiplomaIdindtoContext =  useContext(ExamContext)

    const deferredSearch = useDeferredValue(search);
    const settingRef = useRef<HTMLTableCellElement>(null)
    

    function getExams() {
        let mutOrNot = mutableOrNot === "true" ? true : false;
        SetAllDiplomaExams(
          (Array.isArray(data) ? data : []).filter(
            (e) => e.immutable === mutOrNot
          ))
    }

    let sortedList:Daum[] | undefined;

    // sortedList = allDiplomaExams && [...allDiplomaExams].filter(e => (
    //     e.title.toLocaleLowerCase().includes(deferredSearch.toLowerCase())
    // ))

    if(sorted.split(" ")[0] === "title" && sorted.split(" ")[1] === "descending") {

        sortedList = allDiplomaExams && [...allDiplomaExams].sort(( a , b ) => b.title.localeCompare(a.title))
        
    } else if (sorted.split(" ")[0] === "title" && sorted.split(" ")[1] === "ascending") {
        
        sortedList =  allDiplomaExams && [...allDiplomaExams].sort(( a , b ) => a.title.localeCompare(b.title))

    } else if (sorted.split(" ")[0] === "newest" && sorted.split(" ")[1] === "descending") {
        
        sortedList = allDiplomaExams && [...allDiplomaExams].sort((a , b) => b.createdAt.localeCompare(a.createdAt)) 

    } else if (sorted.split(" ")[0] === "newest" && sorted.split(" ")[1] === "ascending") {
    
        sortedList =  allDiplomaExams && [...allDiplomaExams].sort((a , b) => a.createdAt.localeCompare(b.createdAt))
    
    } else if (sorted.split(" ")[0] === "question" && sorted.split(" ")[1] === "descending") {
    
        sortedList = allDiplomaExams && [...allDiplomaExams].sort((a, b) => b.questionsCount - a.questionsCount); 

    } else if (sorted.split(" ")[0] === "question" && sorted.split(" ")[1] === "ascending") {
    
        sortedList = allDiplomaExams && [...allDiplomaExams].sort((a, b) => a.questionsCount - b.questionsCount);    
    }
    
    useEffect(()=>{
        setAllDiploma(allDiploma);
        getExams();
        SetAllDiplomaExams(sortedList);
        diplomaId && setdiplomaIdindtoContext?.setDiploma(diplomaId)

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
        
            if (sortRef.current && !sortRef.current.contains(target)) {
                setAppearSorted(false);
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[payload,sortedList, diplomaId])
    
    useEffect(()=>{
        getExams();

    },[])
    
  return (
    <div>
        <div className="fixed pb-2 px-5 left-96 right-0 border-b bg-white z-1000">
        <PageTitle> Exam </PageTitle>
        <div className="flex justify-between">
          <div className="flex items-center justify-between w-full max-w-[430px]">
            <span className="font-mono text-[16px] text-[#1F2937] whitespace-nowrap">
                {payload?.metadata.page} - {payload?.metadata.limit} of {payload?.metadata.totalPages}
            </span>

            <div className="flex items-center ml-6">
              <button
                onClick={()=>setPageNumber((prev) => prev - 1)}
                disabled = {pageNumber === 1}
                className={cn(
                    "w-[50px] h-[50px] flex items-center justify-center cursor-pointer",
                    pageNumber === 1 ? "bg-[#F1F2F4] text-[#9CA3AF] disabled:cursor-not-allowed" : "bg-[#F1F2F4] text-[#1F2937]" ,
                )}
              >
                <ChevronLeft
                    
                    className={cn(pageNumber === 1 ? "disabled:cursor-not-allowed" : "cursor-pointer")}
                    size={22}
                    strokeWidth={2}
                />
              </button>

              <div
              
                className="h-[50px] px-5 flex items-center justify-center
                            bg-white font-mono text-[16px] text-[#9CA3AF]
                            whitespace-nowrap"
              >
                Page {payload?.metadata.page} of {payload?.metadata.totalPages}
              </div>

              <button
              onClick={()=>setPageNumber((prev) => prev + 1)}
              disabled = {pageNumber === payload?.metadata.totalPages}
                className={cn(
                    "w-[50px] h-[50px] flex items-center justify-center cursor-pointer",
                    pageNumber === payload?.metadata.totalPages ? "bg-[#F1F2F4] text-[#9CA3AF] disabled:cursor-not-allowed" : "bg-[#F1F2F4] text-[#1F2937]" ,
                )}
              >
                <ChevronRight
                    className={cn(pageNumber === payload?.metadata.totalPages ? "disabled:cursor-not-allowed" : "cursor-pointer")}
                    size={22}
                    strokeWidth={2}
                />
              </button>
            </div>
          </div>

          <Link
            to={"/exams/adminExams/createNewExam"}
            className="cursor-pointer
                    inline-flex items-center gap-4
                    bg-[#00C389]
                    px-6 py-4
                    font-mono text-base font-normal text-white
                    transition-colors duration-200
                    hover:bg-[#00B27D]"
          >
            <span className="text-2xl leading-none">+</span>
            <span>Create New Exam</span>
          </Link>
        </div>
        </div>

        <div className="relative top-30">
            <div className="w-full border border-slate-200 bg-white">
          {/* Header */}
            <div className="flex h-9 items-center justify-between bg-[#1764e8] px-3">
            <div className="flex items-center gap-1.5 text-white">
                <SlidersHorizontal size={20} />

                <span className="text-[16px] font-medium">Search & Filters</span>
            </div>

            <button className="flex items-center gap-1 text-[16px] text-white">
                <X size={20} />
                Hide
            </button>
            </div>

          {/* Body */}
            <div className="p-3">
            <div className="flex gap-5 flex-col">
              {/* Search input */}
                <div className="relative flex-1">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}

                    placeholder="Search by title"
                    className="
                    h-7 w-full
                    border border-slate-200
                    p-5
                    text-[16px]
                    text-slate-600
                    outline-none
                    placeholder:text-slate-400
                    focus:border-blue-400
                    "
                />

                <Search
                    size={20}
                    className="
                    absolute right-2 top-1/2
                    -translate-y-1/2
                    text-slate-300
                    "
                />
                </div>

                <div className="flex gap-10">

                    {/* Immutability */}
                    <div className="relative w-[200px] order-1">
                        <select
                        defaultValue={mutableOrNot}
                        className="
                        h-7 w-full
                        appearance-none
                        border border-slate-200
                        bg-white
                        px-2
                        pr-6
                        text-[16px]
                        text-slate-500
                        outline-none"
                        onChange={(e)=>setMutableOrNot(e.target.value)}
                        
                    >   

                        <option value="true">Immutable</option>

                        <option value="false">Mutable</option>
                        </select>
                    
                        <ChevronDown
                            size={16}
                            className="
                            absolute right-2 top-1/2
                            -translate-y-1/2
                            text-slate-400
                            "
                        />
                    </div>

                    {/* Diploma */}
                    <div className="relative w-[200px]">
                        <select
                        defaultValue={mutableOrNot}
                        className="
                        h-7 w-full
                        appearance-none
                        border border-slate-200
                        bg-white
                        px-2
                        pr-6
                        text-[16px]
                        text-slate-500
                        outline-none"
                        onChange={(e)=>setDiplomaId(e.target.value)}
                        
                    >   
                        {diplomasTitle?.map((e)=>(
                            <option key={e.id} value={`${e.id}`} >{e.title}</option>
                        ))}

                        </select>

                        <ChevronDown
                            size={16}
                            className="
                            absolute right-2 top-1/2
                            -translate-y-1/2
                            text-slate-400
                            "
                        />
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex justify-end items-center gap-5">
                <button
                className="
                cursor-pointer
                text-[16px]
                font-medium
                text-slate-700
                hover:text-slate-900
                "   
                >
                Clear
                </button>

                <button
                className="
                cursor-pointer
                h-7
                bg-slate-200
                px-4
                text-[16px]
                font-medium
                text-slate-700
                hover:bg-slate-300"
                onClick={()=>getExams()}
                >
                Apply
                </button>
            </div>
            </div>
            </div>
        </div>

        <div className="relative top-40">
            <table className="w-full">
                <thead className="text-white ">
                    <tr className="bg-blue-600">
                        <th className="p-1">Image</th>
                        <th className="p-1">Title</th>
                        <th className="p-1">Description</th>
                        <th className="p-1">No. of Questions</th>
                        
                        <th ref={sortRef} onClick={()=>setAppearSorted(true)} className="relative z-500 flex items-center gap-1 p-1 cursor-pointer transition-all hover:bg-blue-700">
                            <ArrowDownWideNarrow size={16}/> <span>Sort</span>

                            <div className={cn("absolute right-0 hidden w-[220px] overflow-hidden border border-slate-200 bg-white shadow-md"
                                                , appearSorted && "block"
                            )}>
                                <button onClick={()=>setSorted("title descending")} className={cn("flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-blue-100 cursor-pointer" ,
                                                                                                    sorted === "title descending" && "bg-blue-50")}>
                                    <ArrowDownAZ size={18} strokeWidth={1.5} className="text-slate-500" />
                                    <span className="text-sm font-medium text-slate-900">Title</span>
                                    <span className="text-xs text-slate-500">(descending)</span>
                                </button>

                                <button onClick={()=>setSorted("title ascending")} className={cn("flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-blue-100 cursor-pointer" ,
                                                                                                    sorted === "title ascending" && "bg-blue-50")}>
                                    <ArrowUpAZ size={18} strokeWidth={1.5} className="text-slate-500" />
                                    <span className="text-sm font-medium text-slate-900">Title</span>
                                    <span className="text-xs text-slate-500">(ascending)</span>
                                </button>

                                <button onClick={()=>setSorted("question descending")} className={cn("flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-blue-100 cursor-pointer" ,
                                                                                                    sorted === "question descending" && "bg-blue-50")}>
                                    <ArrowDownAZ size={18} strokeWidth={1.5} className="text-slate-500" />
                                    <span className="text-sm font-medium text-slate-900">Question No.</span>
                                    <span className="text-xs text-slate-500">(descending)</span>
                                </button>

                                <button onClick={()=>setSorted("question ascending")} className={cn("flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-blue-100 cursor-pointer" ,
                                                                                                    sorted === "question ascending" && "bg-blue-50")}>
                                    <ArrowUpAZ size={18} strokeWidth={1.5} className="text-slate-500" />
                                    <span className="text-sm font-medium text-slate-900">Question No.</span>
                                    <span className="text-xs text-slate-500">(ascending)</span>
                                </button>

                                <button onClick={()=>setSorted("newest descending")} className={cn("flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-blue-100 cursor-pointer" ,
                                                                                                    sorted === "newest descending" && "bg-blue-50")}>
                                    <CalendarDays size={18} strokeWidth={1.5} className="text-slate-500" />
                                    <span className="text-sm font-medium text-slate-900">Newest</span>
                                    <span className="text-xs text-slate-500">(descending)</span>
                                </button>

                                <button onClick={()=>setSorted("newest ascending")} className={cn("flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-blue-100 cursor-pointer" ,
                                                                                                    sorted === "newest ascending" && "bg-blue-50")}>
                                    <CalendarDays size={18} strokeWidth={1.5} className="text-slate-500" />
                                    <span className="text-sm font-medium text-slate-900">Newest</span>
                                    <span className="text-xs text-slate-500">(ascending)</span>
                                </button>
                            </div>
                        </th>
                    </tr>
                </thead>
                
                <tbody>
                    {allDiplomaExams?.length === 0 ? <tr><td colSpan={4}><NotFoundData /></td></tr> : allDiplomaExams?.map((e, index) => (
                        <tr key={e.id} className="text-center hover:bg-gray-300 transition-all">
                            <td className="p-2"> <img src={`${e.image}`} className="w-[70px] w-[80px]"/></td>
                            <td className="p-2">{e.title}</td>
                            <td className="p-2 text-[#6B7280]">{e.description}</td>
                            <td>{e.questionsCount}</td>
                            <td className="relative p-2">
                                <button
    onClick={() =>
      setDiplomaSetting(
        diplomaSetting === index + 1 ? null : index + 1
      )
    }
    type="button"
    className="flex h-[30px] w-[30px] items-center justify-center bg-[#E5E7EB] cursor-pointer"
  >
    <div className="flex items-center gap-[2px]">
      <span className="h-[3px] w-[3px] rounded-full bg-[#1F2937]" />
      <span className="h-[3px] w-[3px] rounded-full bg-[#1F2937]" />
      <span className="h-[3px] w-[3px] rounded-full bg-[#1F2937]" />
    </div>
                                </button>

                                {diplomaSetting === index + 1 && (
    <div
      ref={settingRef}
      className="absolute right-0 bottom-10 z-[900] w-[165px] bg-white py-3 shadow-md"
    >
      {/* View */}
      <Link
        to={`/exams/adminExams/${e.id}`}
        className="flex h-[40px] w-full items-center gap-3 cursor-pointer px-4 text-left hover:bg-gray-50"
      >
        <span className="relative flex h-[16px] w-[18px] items-center justify-center">
          <span className="absolute h-[12px] w-[18px] rounded-[50%] border-2 border-[#00C853]" />
          <span className="h-[4px] w-[4px] rounded-full bg-[#00C853]" />
        </span>

        <span className="font-mono text-[16px] text-[#1F2937]">
          View
        </span>
      </Link>

      {e.immutable === false && (
        <>
          {/* Edit */}
          <Link
            to={`/exams/adminExams/updateExam/${e.id}`}
            className="flex h-[40px] w-full items-center gap-3 px-4 text-left hover:bg-gray-50"
          >
            <span className="relative h-[18px] w-[18px]">
              <span className="absolute left-[2px] top-[7px] h-[5px] w-[17px] rotate-[-45deg] rounded-[2px] border-2 border-[#2563FF]" />
              <span className="absolute bottom-[1px] left-0 h-[5px] w-[5px] rotate-[-45deg] border-b-2 border-l-2 border-[#2563FF]" />
            </span>

            <span className="font-mono text-[16px] text-[#1F2937]">
              Edit
            </span>
          </Link>

          {/* Delete */}
          <button
            onClick={() => {
              setDeleteDiploma(true);
              setDiplomaTitle(e.title);
              setDiplomaId(e.id);
            }}
            className="flex cursor-pointer h-[40px] w-full items-center gap-3 px-4 text-left hover:bg-gray-50"
          >
            <span className="relative h-[18px] w-[16px]">
              <span className="absolute bottom-0 left-[2px] h-[13px] w-[12px] rounded-b-[2px] border-2 border-[#FF1F1F]" />
              <span className="absolute left-0 top-[3px] h-[2px] w-[16px] bg-[#FF1F1F]" />
              <span className="absolute left-[5px] top-0 h-[4px] w-[6px] rounded-t-[2px] border-2 border-b-0 border-[#FF1F1F]" />
            </span>

            <span className="font-mono text-[16px] text-[#1F2937]">
              Delete
            </span>
          </button>
        </>
      )}
    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            {deleteDiploma && 
                    (<AdminDeleteDiloma diplomaId={diplomaId} diplomaTitla={diplomaTitle} deleteDiploma={deleteDiploma} setDeleteDiploma={setDeleteDiploma} examOrDiploma="Exam"/>)
            }
        </div>
    </div>
  )
}
