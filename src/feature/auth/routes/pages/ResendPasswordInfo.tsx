import { Link } from "react-router";
import ForwardArrow from "../../../../shared/forwardArrow/ForwardArrow";
import { useContext } from "react";
import { ExamContext } from "../../../../Context/UseContext";

export default function ResendPasswordInfo() {
    const theEmail = useContext(ExamContext);
    
  return (
    <div className="space-y-7 w-93.5">
        <ForwardArrow prop="/forgot-password"/>
        <p className="font-'Inter' font-bold text-[30px] leading-none tracking-normal align-middle">Password Reset Sent</p>
        <div>
            <p className="font-'Geist_Mono' font-normal text-[16px] leading-none tracking-normal align-middle">We have sent a password reset link to:</p>
            <p className="text-[#155DFC]">{theEmail?.email}</p>
        </div>

        <p className="font-'Geist_Mono' font-normal text-[16px] leading-6 tracking-normal align-middle">Please check your inbox and follow the instructions to reset your password.</p>
        <p className="font-'Geist_Mono' text-[#6B7280] font-normal text-[16px] leading-6 tracking-normal align-middle">If you don’t see the email within a few minutes, check your spam or junk folder.</p>
        <p className="text-[#6B7280]">Dont' have an account? <Link to="/register" className="text-blue-600">Create Yours</Link></p>
    </div>
  )
}
