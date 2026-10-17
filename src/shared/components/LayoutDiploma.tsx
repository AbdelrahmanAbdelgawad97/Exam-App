import { Link, useNavigate } from "react-router";
import elevatPhoto from  "../../assets/elevat logo.png"
import { BookOpenCheck, FolderCode, GraduationCap, Logs, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { LogOutMenu } from "./LogOut";
import useUserInfo from "../../feature/api/quiries/use-user-info";


export default function LayoutDiploma() {

    const navigation = useNavigate();
    const [option, setOption]= useState("diploma");
    const {data: user} = useUserInfo();
    const isAdmin = user?.role === "ADMIN";



    useEffect(()=>{
        setOption("diploma");
         
        isAdmin ? navigation("/exams/adminDiploma") : navigation("/exams/diplomas")
    },[isAdmin])

return (
    <div className={cn("col-span-1 flex flex-col justify-between h-[88vh]" ,
        isAdmin ? "bg-[##1F2937]" : "bg-[#EFF6FF]"

    )}>
        <div className="flex flex-col items-center gap-8">
            <div>
                    <div className={cn(!isAdmin && "bg-[#414448] p-2 rounded")}>
                        <img src={elevatPhoto}/>
                    </div>

                    <div className={cn(" flex align-middle gap-1 font-bold mt-4",
                        isAdmin ? "text-[#ffffff]" : "text-[#155DFC]"
                    )}>
                        <FolderCode className="mr-2"/>
                        <p className="tracking-widest text-xl">Exam App</p>
                    </div>
            </div>

            <div className="flex flex-col items-start gap-10 ">
                    <div onClick={()=> setOption("diploma")} className={cn(option === "diploma" ? isAdmin ? "text-[#ffffff] border-2 border-[#ffffff] bg-[#9CA3AF]" : "text-[#2B7FFF] border-2 border-[#2B7FFF]" : "text-[#6B7280]")}>
                        <Link to={`${isAdmin ? "/exams/adminDiploma" : "/exams/diplomas"}`} className="flex items-center justify-start gap-5 py-5 pr-20 pl-3 w-75"><GraduationCap /> Diplomas</Link>
                    </div>

                    {isAdmin && 
                        
                        <div onClick={()=> setOption("exams")} className={cn(option === "exams" ? isAdmin ? "text-[#ffffff] border-2 border-[#ffffff] bg-[#9CA3AF]" : "text-[#2B7FFF] border-2 border-[#2B7FFF]" : "text-[#6B7280]")}>
                            <Link to="/exams/adminExams" className="flex items-center justify-start gap-5 py-5 pr-20 pl-3 w-75"><BookOpenCheck /> Exams</Link>
                        </div>
                    }

                    <div onClick={()=> setOption("userData")} className={cn(option === "userData" ? isAdmin ? "text-[#ffffff] border-2 border-[#ffffff] bg-[#9CA3AF]" : "text-[#2B7FFF] border-2 border-[#2B7FFF]" : "text-[#6B7280]")}>
                        <Link to="/userInfo" className="flex items-center justify-start gap-5 py-5 pr-20 pl-3 w-75"><UserRound /> Account Settings</Link>
                    </div>

                    
                    {isAdmin && 
                        <div onClick={()=> setOption("logs")} className={cn(option === "logs" ? isAdmin ? "text-[#ffffff] border-2 border-[#ffffff] bg-[#9CA3AF]" : "text-[#2B7FFF] border-2 border-[#2B7FFF]" : "text-[#6B7280]")}>
                            <Link to="/exams/auditLogList" className="flex items-center justify-start gap-5 py-5 pr-20 pl-3 w-75"><Logs /> Audit Log</Link>
                        </div>
                    }
            </div>

        </div>

        <div className="">
            <LogOutMenu />
        </div>
    </div>
)
}
