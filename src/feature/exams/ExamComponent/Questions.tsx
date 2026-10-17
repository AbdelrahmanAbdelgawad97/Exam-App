import { useNavigate, useParams } from "react-router";
import { useQueryQuestions } from "../../api/quireisDiploma/use-quiry-questions";
import PageTitle from "../../../shared/components/PageTitle";
import ForwardArrow from "../../../shared/forwardArrow/ForwardArrow";
import SectionsTitle from "../../../shared/components/SectionsTitle";
import { ChevronLeft, ChevronRight, CircleQuestionMark } from "lucide-react";
import { cn } from './../../../shared/lib/utils';
import { useState } from "react";
import { Button } from "#components/ui/button";
import { useSendAllAnswers } from "../../api/quireisDiploma/use-send-answers";
import { diplomaName , theExamTimerExported , theExamTitleExported} from "./Exams";
import Counter from "./counter";


export default function Questions() {    
    const navigation = useNavigate();
    const [endExam, setEndExam] = useState(false);
    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [selectAnswer, setSselectAnswer] = useState<Record<string, string>>({});
    const currentDate: Date = new Date();

    const {id} = useParams();
    const {data: questions} = useQueryQuestions(id)
    const {mutate: sendAllAnswers} = useSendAllAnswers()
  
    let theQuestion = questions && questions[currentQuestion];

    function submitAnswers() {
      const result = Object.entries(selectAnswer).map(
          ([questionId, answerId]) => ({
            questionId,
            answerId,
          })
        );
        sendAllAnswers({examId: id , answers: result, startedAt: currentDate});
        navigation("/exams/result");
    }


    function chosenAnswer(questionId:string , answerId: string) {
      setSselectAnswer(prevData => ({
        ...prevData,
        [questionId] : answerId,
      }))
    }

    if(endExam === true) {
      submitAnswers();
    }

    function nextQuesiton() {
      setCurrentQuestion(currentQuestion+1);
    }

    function previuseQuesiton() {
      setCurrentQuestion(currentQuestion-1);
    }

  return (
    <>
      <PageTitle>Diploma / {diplomaName} / <span className="text-blue-600">Exams</span></PageTitle>

      <div className="flex items-center gap-2">
        <ForwardArrow prop={"/exams/diplomas"}/>
        <SectionsTitle> 
          <>
            <CircleQuestionMark className="w-10 h-10" />
            <p className=""> {theExamTitleExported}</p>
          </>
        </SectionsTitle>
      </div>
      <div className="mt-10">

        {questions?.length === 0 ? 
        
        <p className="mt-2 max-w-sm text-sm text-gray-500 text-center mx-auto relative top-[25%] translate-y-[-50%]"> There are currently no questions available for this exam yet. Please check back later.</p>
        :
        <>
        
        <div className="topPart flex justify-between">
          <div className="w-[90%]">
            <div className="flex justify-between">
              <p className="font-mono font-normal text-base leading-none tracking-normal">{diplomaName}</p>
              <p className="text-[#6B7280]">Quesiton <span className="text-[#155DFC] font-bold">{currentQuestion+1}</span> Of {questions?.length}</p>
            </div>
            <div className="relative bg-[#EFF6FF] w-full h-5 mt-5">
              <span className={cn("absolute bg-[#155DFC] h-full")} style={{width: `${((currentQuestion+1) / (questions?.length || 1)) * 100}%`,transition: "width 500ms ease-in-out",}} ></span>
            </div>
          </div>

          <Counter theExamTimerExported={theExamTimerExported} setEndExam={setEndExam}/>

        </div>

        <div className="w-full">
          <h2 className="mb-5 font-mono text-2xl font-bold text-[#155DFC]">
            {currentQuestion+1}){theQuestion?.text}
          </h2>

          <div className="flex flex-col gap-3">
            {theQuestion?.answers.map((answer) => (
              <label onClick={()=>chosenAnswer(theQuestion.id,answer.id)}
                key={answer.id}
                className={`flex h-15.5 cursor-pointer items-center gap-3 px-5 transition-colors hover:bg-gray-200`}
              >
                <input
                  checked={selectAnswer[theQuestion.id] === answer.id}
                  type="radio"
                  name="answer"
                  value={answer.text}
                  className="h-5 w-5 accent-[#155DFC]"
                />

                <span className="
                    font-['Geist_Mono']
                    font-normal
                    text-[22px]
                    leading-[100%]
                    tracking-normal
                    align-middle
                  ">
                  {answer.text}
                </span>
              </label>
            ))}
          </div>
          <div className="w-full gap-2">

            {currentQuestion === 0 ?  
            <Button disabled className="w-[49%] " variant="ghost">Previuse</Button>
            : 
            <Button onClick={()=>previuseQuesiton()} className="w-[49%]" variant="ghost"><ChevronLeft/> Previuse</Button>
            }
            {
              currentQuestion+1 === questions?.length ? 
              <Button onClick={()=>submitAnswers()} className="w-[49%]" variant="default">Submit</Button>
              :
              <Button onClick={()=>nextQuesiton()} className="w-[49%] " variant="default">Next <ChevronRight/> </Button>
            }
          </div>
        </div>
        </>    
      }
      </div>
    </>
  )
}
