import { BookOpenCheck, CircleQuestionMark, Timer } from "lucide-react";
import PageTitle from "../../../shared/components/PageTitle";
import SectionsTitle from "../../../shared/components/SectionsTitle";
import ForwardArrow from "../../../shared/forwardArrow/ForwardArrow";
import { Link, useParams } from "react-router";
import { useAllDiplomaExams, useAllDiplomaTest } from "../../api/quireisDiploma/use-quiry-exams";
import { useContext, useEffect } from "react";
import { ExamContext } from "../../../Context/UseContext";

export let diplomaName: string | undefined;
export let theExamTimerExported: number;
export let theExamTitleExported: string;

export default function Exams() {

  const {id} = useParams();
  const contextId = useContext(ExamContext);
  // id && contextId?.setExamID(id)
  const {data: topicsDiploma } = useAllDiplomaExams(id);
  const {data: exams } = useAllDiplomaTest(id);
  console.log("exams ====> " , exams)
  diplomaName = topicsDiploma?.title;

  function durationTitle(time:number, tit:string) {
    theExamTitleExported = tit;
    theExamTimerExported = time;

  }

  useEffect(() => {
    if (id) {
      contextId?.setExamID(id);
    }
  }, [id, contextId]);

  return (
    <>
      <PageTitle>Diploma / {topicsDiploma?.title} / <span className="text-blue-600">Exams</span></PageTitle>

      <div className="flex items-center gap-2">
        <ForwardArrow prop={"/exams/diplomas"}/>
        <SectionsTitle> 
          <>
            <BookOpenCheck className="w-10 h-10" />
            <p className="">{topicsDiploma?.title} Exams</p>
          </>
        </SectionsTitle>
      </div>
      
      {exams?.exams.length !== 0  ? exams?.exams.map((e) => (
        
        <Link to={`/exams/diplomas/${e.id}`} onClick={()=>durationTitle(e.duration, e.title)} key={e.id} className="flex items-center gap-3 mt-5 p-5 bg-[#EFF6FF] border border-transparent hover:border-dashed hover:border-blue-600 transition-all duration-300">
          <div className="">
            <img src={e.image} alt="" className="w-[4.6rem]" />
          </div>

          <div>
            <div className="top flex justify-between">
              <p className="text-[#155DFC] font-bold mb-4">{e.title}</p>
              <div className="flex text-[#1F2937]">
                <p className="flex"><CircleQuestionMark className="mx-2"/> {e.questionsCount} </p>
                <p className="flex"> | <Timer className="mx-2"/> {e.duration}</p>
              </div>
            </div>
            <p className="text-[#6B7280] leading-6 tracking-normal">{e.description}</p>
          </div>

        </Link>

      )) :  <p className="mt-2 max-w-sm text-sm text-gray-500 text-center mx-auto relative top-[25%] translate-y-[-50%]">
              There are currently no exams available for this diploma. Please check
              back later.
            </p>}
    </>
  )
}
