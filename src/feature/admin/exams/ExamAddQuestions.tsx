import { useContext, useEffect, useState } from 'react'
import { ExamContext } from '../../../Context/UseContext';
import { useExamDetails } from '../../api/quireisDiploma/use-specific-exam';
import { X, Save, Copy, ChevronDown, Trash2, CheckCheck, Edit } from "lucide-react";
import { cn } from '../../../shared/lib/utils';
import { FieldError } from '#components/ui/field';
import useAddQuestions from '../../api/quireisDiploma/use-add-questions';
import { Link, useNavigate, useParams } from 'react-router';
import { useGetQuestions } from '../../api/quireisDiploma/use-get-questions';
import type { Question } from '../../user/types/iQuestions';
import { useUpdateQuestion } from '../../api/quireisDiploma/use-update-question';

export default function ExamAddQuestions() {

    const {id: paramID} = useParams();

    const navigation = useNavigate()

    const setExamID = useContext(ExamContext);

    const {data: examDetails} = useGetQuestions(setExamID?.examID)

    const {data} = useExamDetails(setExamID?.examID);

    const [addAnswerOption, setAddAnswerOption] = useState(false);

    const [addTheAnswer, setAddTheAnswer] = useState<string>();

    const [question,setQuestion] = useState<string>()

    const [allAnswers, setAllAnswers] = useState<{ text: string, isCorrect: boolean }[]>([]);

    const [enteredQuesiton,setEnteredQuesiton] = useState(false);
    
    const [enteredAnswers, setEnteredAnswers] = useState(false);
    
    const [selectedCorrectAnswer, setSelectedCorrectAnswer] = useState(false);

    const {mutate: addQuestions} = useAddQuestions()

    const [examQuestions, setExamQuestions] = useState<Question[] | undefined>();

    const {mutate: adminUpdateQuestion} = useUpdateQuestion()

    function add() {
      setAllAnswers((prev) => [
        ...prev,
        { text: addTheAnswer ?? "",
          isCorrect: false
        }
      ]);    
    }

    function deleteItem(indexItem:number) {
        setAllAnswers((prev) =>
          prev.filter((_, index) => index !== indexItem)
        );
    }

    function stepBack() {
      if (!setExamID?.examID) return;
      navigation(`/exams/adminExams/updateExam`)
    }

    // function setCorrectAnswer(indexItem: number) {
    //   setAllAnswers((prev) =>
    //     prev.map((e, index) => (
    //       e.isCorrect === false ?  
    //         {
    //         ...e,
    //         isCorrect: index === indexItem,
            
    //       }
    //       :
    //       {
    //         ...e,
    //         isCorrect: !(index === indexItem),
            
    //       }
    //   ))
    //   );
    // }

  function setCorrectAnswer(indexItem: number) {
    setAllAnswers((prev) =>
      prev.map((e, index) => ({
        ...e,
        isCorrect: index === indexItem,
      }))
    );
  }


    function sendAnswers() {

      let hasError = false;

      // Question validation
      if (!question?.trim()) {
        setEnteredQuesiton(true);
        hasError = true;
      } else {
        setEnteredQuesiton(false);
      }
    
      // Answers validation
      if (allAnswers.length === 0) {
        setEnteredAnswers(true);
        hasError = true;
      } else {
        setEnteredAnswers(false);
      }
    
      // Correct answer validation
      if (!allAnswers.some((answer) => answer.isCorrect === true)) {
        setSelectedCorrectAnswer(true);
        hasError = true;
      } else {
        setSelectedCorrectAnswer(false);
      }
    
      // Stop here if there is any error
      if (hasError) return;
    
      if (!setExamID?.examID) return;

      if (!question) return;

      if(paramID === undefined) {
      
        addQuestions({
          id: setExamID.examID,
          values: {
            text: question,
            answers: allAnswers,
          },
        });
      
      } else {

        adminUpdateQuestion({
          id: setExamID.examID,
          value: {
            text: question,
            answers: allAnswers,
          },
        })

      }
    }
    


  useEffect(() => {
    const questions = examDetails?.data?.payload?.questions

    if (!questions) return

    const currentQuestion = questions.find(
      e => e.id === paramID
    )

    if (!currentQuestion) return

    setQuestion(currentQuestion.text)
    setAllAnswers(currentQuestion.answers ?? [])
    setExamQuestions([currentQuestion])

  }, [examDetails, paramID])
    
    
  return (
    <>
      <div className=" bg-white p-4 text-[11px] text-slate-700">
      
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-1.5 text-[9px]">
        <span className="text-slate-400">Exams</span>
        <span className="text-slate-300">/</span>
        {paramID === undefined ? 
        
        <span className="font-medium text-blue-600">
          Create New Question
        </span>
        
        : 
        
        <span className="font-medium text-blue-600">
          Update Exam Question
        </span>
        }

      </div>

      {/* Top Actions */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-1.5 border border-slate-200 
                    bg-slate-100 px-3 py-1.5 text-[9px] font-medium 
                    text-slate-600 hover:bg-slate-200"
        >
          <Copy size={11} />
          Bulk Add Mode
        </button>

        <div className="flex items-center gap-2">
          {/* Cancel */}
          <Link
          to={`/exams/adminExams/updateExam/${setExamID?.examID}`}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 
                      text-[9px] font-medium text-slate-600 
                      hover:bg-slate-100 cursor-pointer"
            onClick={()=>stepBack()}          
          >
            <X size={11} />
            Cancel
          </Link>

          {/* Save */}
          {paramID === undefined? 
          
          <button
            type="submit"
            className="flex items-center gap-1.5 bg-emerald-500 
                      px-4 py-1.5 text-[9px] font-semibold 
                      text-white hover:bg-emerald-600 cursor-pointer"
            onClick={()=>sendAnswers()}          
          >
            <Save size={11} />
            Save
          </button>
          : 
          
          <button
            type="submit"
            className="flex items-center gap-1.5 bg-blue-500 
                      px-4 py-1.5 text-[9px] font-semibold 
                      text-white hover:bg-blue-600 cursor-pointer"
            onClick={()=>sendAnswers()}          
          >
            <Edit size={11} />
            Update
          </button>
          }
        </div>
      </div>

      {/* Question Information */}
      <div className="border border-slate-100 bg-white">
        
        {/* Section Header */}
        <div className="bg-blue-600 px-3 py-1.5">
          <h2 className="font-mono text-[10px] font-semibold text-white">
            Question Information
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-3 p-3">
          
          {/* Exam */}
          <div>
            <label
              htmlFor="exam"
              className="mb-1 block text-[10px] font-semibold text-slate-600"
            >
              Exam
            </label>

            <div className="relative">
              <select
                id="exam"
                className="h-8 w-full appearance-none border border-slate-200 
                          bg-white px-2.5 pr-8 text-[10px] text-slate-400 
                          outline-none transition
                          focus:border-blue-500 focus:ring-1 
                          focus:ring-blue-100"
                defaultValue=""
              >
                <option value={`${data?.payload?.exam?.title ?? "" }`}>
                  {data?.payload?.exam?.title ?? ""}
                </option>
              </select>

              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-2.5 
                          top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          {/* Question Headline */}
          <div>
            <label
              htmlFor="questionHeadline"
              className="mb-1 block text-[10px] font-semibold text-slate-600"
            >
              Question Headline
            </label>

            <input
              
              value={paramID && question}
              id="questionHeadline"
              type="text"
              placeholder=""
              className="h-8 w-full border border-slate-200 
                        px-2.5 text-[10px] text-slate-700 
                        outline-none transition
                        focus:border-blue-500 focus:ring-1 
                        focus:ring-blue-100"
              onChange={(e)=>setQuestion(e.target.value)}          
            />
            {enteredQuesiton && (
              <FieldError>Enter Question</FieldError>
            )}
          </div>

        </div>
      </div>

      </div>




      <div>
          <h2 className='w-full bg-[#155DFC] text-white p-1'>Question Answers</h2>
          <div className= 'bg-[#E5E7EB] flex justify-between '>
            <p className='pl-8 font-bold'>Body</p>

            <button
              type="button"
              disabled={allAnswers.length >= 4}
              className={cn("flex cursor-pointer h-8 p-1 items-center justify-center gap-1.5",
                        "bg-emerald-500 text-[10px] font-medium text-white",
                        "transition-colors hover:bg-emerald-600",
                      allAnswers.length >= 4 && "cursor-no-drop opacity-50 hover:bg-emerald-500")} 
              onClick={()=>{
                setAddAnswerOption(true)
              }}          
            >
              <span className="text-2xl leading-none">+</span>
              <span className='text-xl'>Add Answer</span>
            </button>        
          </div>

          <div className="w-full overflow-hidden border border-slate-100 bg-white">
            {/* Answer */}
            {allAnswers?.map((e,i) => (
            <div className="flex h-[49px] items-center border-b border-slate-100">
              {/* Delete */}
              <div className="flex h-full w-[52px] items-center justify-center bg-red-50">
                <button onClick={()=> deleteItem(i)} className="text-red-500 hover:text-red-600 cursor-pointer">
                  <Trash2 />
                </button>
              </div>

              {/* Answer Text */}
              <div className="flex-1 px-4 font-mono text-[14px] text-slate-700">
                {e.text}
              </div>

              {/* Action */}
              {e.isCorrect === true ? 
              <button onClick={()=> setCorrectAnswer(i)} className='flex text-[#00BC7D] gap-2 cursor-pointer pr-3'>
                <CheckCheck />
                <p>Correct Answer</p>
              </button> 
              : 
              <div className="pr-2">
                <button
                onClick={() => setCorrectAnswer(i)}
                className="flex items-center gap-1.5 bg-slate-100 px-3 py-2 text-[12px] text-slate-700 cursor-pointer">
                  <span>✓</span>
                  Mark Correct
                </button>
              </div>
              }
            </div>
            ))}
            {enteredAnswers && (
              <FieldError>Enter Answers</FieldError>
            )}
            
            {selectedCorrectAnswer && (
              <FieldError>Select Correct Answer</FieldError>
            )}

          </div>

          {addAnswerOption && allAnswers.length < 4 && 
            <div className='flex items-center gap-5 bg-[#ECFDF5] p-2'>
                <button className='border border-3 w-fit rounded-full p-1 cursor-pointer'
                        onClick={()=>{
                          setAddAnswerOption(false)
                        }}
                > <X /> </button>
                
                <input
                  type="text"
                  placeholder="Enter answer body"
                  className="h-10 w-full border border-emerald-400
                            bg-white px-2.5
                            font-mono text-slate-600
                            outline-none
                            placeholder:text-slate-400
                            focus:border-emerald-500
                            focus:ring-1 focus:ring-emerald-100"
                  onChange={(e)=>{setAddTheAnswer(e.target.value)}}          
                />
                <button
                  type="button"
                  className="flex cursor-pointer h-10 p-1 items-center justify-center gap-1.5
                            bg-emerald-500 text-[10px] font-medium text-white
                            transition-colors hover:bg-emerald-600"
                  onClick={add}          
                >
                <span className="text-2xl leading-none">+</span>
                <span className='text-xl'>Add </span>
              </button>
            </div>
          }
      </div>
    </>
    
  );
}
