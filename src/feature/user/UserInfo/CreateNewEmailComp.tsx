import { X } from "lucide-react";
import { cn } from "../../../shared/lib/utils";
import EntryNewEmail from "./EntryNewEmail";
import VerifyEmail from "./VerifyEmail";
import { useState } from "react";
import  { REGISTER_STEPS } from './../../auth/constatns/formConstant';
import type { IRegisterStep } from "../../auth/types/register";

type Props = {
  overLayOne: boolean;
  setOverLayOne: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateNewEmailComp({overLayOne , setOverLayOne}:Props) {
    
    const [step , setStep] = useState<IRegisterStep>(REGISTER_STEPS.EMAIL);    

    function switchPhase() {
        switch (step) {
            case REGISTER_STEPS.EMAIL:
                return <EntryNewEmail setStep={setStep}/>;
                
            case REGISTER_STEPS.OTP_VERIFICATION:
                return <VerifyEmail setStep={setStep} setOverLayOne={setOverLayOne}/>   
        }
    }

  return (
    <>
        {overLayOne && <div>
            <div className="fixed inset-0 z-[99] bg-black/50" />

                <div
                    className={cn(
                        "w-[40rem] h-[22rem]",
                        "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
                        "fixed top-1/2 left-1/2 z-[100]",
                        "-translate-x-1/2 -translate-y-1/2",
                        "p-6"
                    )}
                    >
                    <div>
                        <X onClick={()=> setOverLayOne(false)} className="absolute right-[2%] cursor-pointer"/>
                    </div>

                    {switchPhase()}

                </div>
            <div>
            </div>
        </div>}
    
    </>
        
)
}
