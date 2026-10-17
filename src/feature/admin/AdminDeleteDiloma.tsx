import { TriangleAlert, X } from "lucide-react"
import { Button } from "#components/ui/button";
import { useAdminDeleteDiploma } from "../api/quireisDiploma/use-delete-diploma";
import { useNavigate } from "react-router";
import { useAdminDeleteExam } from "../api/quireisDiploma/use-delete-exam";
import { useAdminDeleteQuestion } from "../api/quireisDiploma/use-delete-question";
import { useContext } from "react";
import { ExamContext } from "../../Context/UseContext";
import { useDeleteOneLog } from "../api/logsQuiry/logsDeleteSpecificLog";


type Props = {
    deleteDiploma?: boolean,
    setDeleteDiploma: React.Dispatch<React.SetStateAction<boolean>>,
    diplomaTitla?: string
    diplomaId?: string,
    examOrDiploma?: string,
}


export default function AdminDeleteDiloma({diplomaId,diplomaTitla,deleteDiploma,setDeleteDiploma, examOrDiploma}:Props) {
    const navigation = useNavigate();

    const {mutate: adminDeleteDiploma} = useAdminDeleteDiploma();

    const {mutate: adminDeleteExam} = useAdminDeleteExam();

    const {mutate: adminDeleteQuestion} = useAdminDeleteQuestion();

    const {mutate: deleteSpecificLog} = useDeleteOneLog()

    const setExamID = useContext(ExamContext);

    function deleteDiplomaAction() {

        if (examOrDiploma === "Diploma") {

            diplomaId && adminDeleteDiploma(diplomaId);
            setDeleteDiploma(false);
            navigation("/exams/adminDiploma");

        } else if(examOrDiploma === "Question") {

            diplomaId && adminDeleteQuestion(diplomaId);
            setDeleteDiploma(false);
            navigation(`/exams/adminExams`);

        } else if(examOrDiploma === "AuditLog") {

            diplomaId && deleteSpecificLog(diplomaId);
            navigation(`/exams/auditLogList`);

        } else {

            diplomaId && adminDeleteExam(diplomaId);
            setDeleteDiploma(false);
            navigation("/exams/adminExams");

        }

    }

    return (
        <div className="fixed inset-0 z-[99999] bg-black/50">
            <div className="absolute z-2001 top-1/2 left-1/2 w-[600px] h-[450px] -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] p-5">
                <div className="flex justify-between">
                    <div />
                    <X onClick={()=>setDeleteDiploma(false)} className="cursor-pointer"/>
                </div>

                <div className="flex flex-col justify-around h-full">
                    <div className="w-[100%] bg-[#FEE2E2] w-fit p-3 rounded-full mx-auto">
                        <TriangleAlert className="text-red-600  w-10 h-10"/>
                    </div>
                    <div>
                        <p className="text-[#DC2626]">Are You Sure You Want To delete <span className="font-bold text-xl">{diplomaTitla}</span> {examOrDiploma === "Diploma" ? "Diploma" : examOrDiploma === "Question" ? "Question" : "Exam"} ?</p>
                        <p className="font-mono text-[14px] font-normal leading-[100%] tracking-[0px] align-middle text-[#6B7280] pt-3">This action is permanent and cannot be undone.</p>
                    </div>
                    <div className="flex justify-around">
                        <Button onClick={()=>setDeleteDiploma(false)} variant="secondary" className="w-45">Cancel</Button>
                        <Button onClick={()=>deleteDiplomaAction()} variant="destructive" className="w-45">Delete The {examOrDiploma === "Diploma" ? "Diploma" : examOrDiploma === "Question" ? "Question" : "Exam"}</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}
