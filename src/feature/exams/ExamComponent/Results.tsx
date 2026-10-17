import { CircleQuestionMark, FolderSearch, RotateCcw } from "lucide-react";
import PageTitle from "../../../shared/components/PageTitle";
import SectionsTitle from "../../../shared/components/SectionsTitle";
import ForwardArrow from "../../../shared/forwardArrow/ForwardArrow";
import { diplomaName, theExamTitleExported } from "./Exams";
import { useQueryGetAnswers } from "../../api/quireisDiploma/use-get-results";
import { submissionId } from "../../api/diploma.api";
import { useContext } from "react";
import { cn } from "../../../shared/lib/utils";
import { Button } from "#components/ui/button";
import { useNavigate } from "react-router";
import { ExamContext } from "../../../Context/UseContext";

export default function Results() {
  const {data} = useQueryGetAnswers(submissionId);
  const contextId = useContext(ExamContext);
  const navigation = useNavigate();
  let wrongAnswer: number | undefined = data?.payload.submission.wrongAnswers && data?.payload.submission.wrongAnswers * 10; 
  let correctAnswer: number | undefined = data?.payload.submission.correctAnswers && data?.payload.submission.correctAnswers * 10; 
  let totalQuesiton: number | undefined = data?.payload.submission.totalQuestions && data?.payload.submission.totalQuestions * 10; 
  let score: number | undefined = data?.payload.submission.score && data?.payload.submission.score ; 
  

  function exploreAllExams() {
    navigation(`/exams/${contextId?.examID}`);
  }
  
  function restartExam() {
    navigation(`/exams/${contextId?.examID}/${data?.payload.submission.examId}`);
  }


  
  return (
    <>
      <PageTitle>Diploma / {diplomaName} / <span className="text-blue-600">Result</span></PageTitle>

      <div className="flex items-center gap-2">
        <ForwardArrow prop={"/exams/diplomas"}/>
        <SectionsTitle> 
          <>
            <CircleQuestionMark className="w-10 h-10" />
            <p className=""> {theExamTitleExported}</p>
          </>
        </SectionsTitle>
      </div>

      <div>

      </div>

      {data &&
      
      <div >
        <div >

          <div>
            <div className="flex justify-between items-center mt-3">
              <p className="font-mono font-normal text-base leading-none tracking-normal">{diplomaName}</p>
              <p className="text-[#6B7280]">Correct <span className="text-[#155DFC] font-bold">{correctAnswer && correctAnswer/10}</span> Of {totalQuesiton && totalQuesiton /10}</p>
            </div>

            <div className="relative bg-[#EFF6FF] w-full h-5 mt-5">
              <span className={cn("absolute bg-[#155DFC] h-full")} style={{width: `${correctAnswer}%`,transition: "width 500ms ease-in-out",}} ></span>
            </div>
          </div>

          <p className="my-2 font-geist-mono text-[24px] font-semibold leading-[100%] tracking-normal align-middle text-[#155DFC]">Results: </p>
          
          <div className="flex items-start justify-around">
            <div className="bg-[#BEDBFF] w-80 h-128.5 flex flex-col items-center justify-center gap-15">
              <div
                className="relative mt-5 aspect-square w-50.75 rounded-full "
                style={{
                  background: `conic-gradient(
                    #00BC7D 0% ${correctAnswer}%,
                    #EF4444 ${correctAnswer}% 100%
                  )`,
                }}
              >
                <div className="absolute inset-[15%] flex items-center justify-center rounded-full bg-[#BEDBFF]">
                  <span className="text-2xl font-bold">{score}%</span>
                </div>
              </div>
              <div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#00BC7D] font-geist-mono text-[14px] leading-[100%] tracking-normal align-middle"></div>
                  <p className="font-extrabold">Correct: {correctAnswer && correctAnswer/10}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#EF4444] font-geist-mono text-[14px] leading-[100%] tracking-normal align-middle"></div>
                  <p className="font-extrabold">Wrong: {wrongAnswer && wrongAnswer/10}</p>
                </div>
              </div>
            </div>

            <div className=" h-128.5 overflow-y-auto mx-5">
              {data?.payload?.analytics?.map((ele , index)=>(
                <div key={ele.questionId}>
                  <div className="space-y-2">
                    <p className="font-geist-mono mt-5 text-[20px] font-semibold leading-[100%] tracking-normal text-[#155DFC] align-middle" key={ele.questionId}>{`${index+1})`}{ele.questionText}</p>
                    {ele.isCorrect === true ? 
                      <div className="bg-[#ECFDF5] flex items-center gap-2 p-2">
                        <div className=" relative w-4 h-4 bg-white border border-[#00BC7D] rounded-full"><span className="absolute inset-[15%] bg-[#00BC7D] rounded-full"></span></div>
                        <p>{JSON.parse(JSON.stringify(ele.selectedAnswer, null, 2)).text}</p>
                      </div> 
                      :
                      <div className="space-y-4">

                        <div className="bg-[#FEF2F2] flex items-center gap-2 p-2">
                          <div className=" relative w-4 h-4 bg-white border border-[#DC2626] rounded-full"><span className="absolute inset-[15%] bg-[#DC2626] rounded-full"></span></div>
                          <p>{JSON.parse(JSON.stringify(ele.selectedAnswer, null, 2)).text}</p>
                        </div>

                        <div className="bg-[#ECFDF5] flex items-center gap-2 p-2">
                          <div className=" relative w-4 h-4 bg-white border border-[#00BC7D] rounded-full"><span className="absolute inset-[15%] bg-[#ECFDF5] rounded-full"></span></div>
                          <p>{JSON.parse(JSON.stringify(ele.correctAnswer, null, 2)).text}</p>
                        </div>
                      </div>

                      }
                  </div>
                </div>
                
              ))}
            </div>
          </div>


        </div>

        <div className="w-full">
          <Button className="w-[49%] bg-[#E5E7EB] hover:bg-[#c8cace]" onClick={()=>restartExam()} variant="ghost"> <RotateCcw/> Restart </Button>
          <Button className="w-[49%]" onClick={()=>exploreAllExams()}> <FolderSearch/> Explore </Button>
        </div>
      </div>
      }
    </>
  )
}

