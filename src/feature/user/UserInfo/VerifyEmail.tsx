import { Button } from "#components/ui/button";
import {
InputOTP,
InputOTPGroup,
InputOTPSeparator,
InputOTPSlot,
} from "#components/ui/input-otp"
import { FieldLabel } from '#components/ui/field';
import type { IRegisterStep } from "../../auth/types/register";
import { REGISTER_STEPS } from "../../auth/constatns/formConstant";
import { useState } from "react";
import useUpdatedEmailConfirmCode from "../../api/mutations/use-confirmUpdated-mail";
import { toast } from "#components/ui/toast";


type Props = {
    setStep: React.Dispatch<React.SetStateAction<IRegisterStep>>,
    setOverLayOne: (isOpen: boolean) => void
}

export default function VerifyEmail({setStep, setOverLayOne}:Props) {
    
    const [code, setCode] = useState("");
    const {mutate: confirmUpdatedEmailOtb } = useUpdatedEmailConfirmCode();

    function sendTheCode() {
        confirmUpdatedEmailOtb({"code": code});
        setOverLayOne(false);
        toast.add({
                type: "success",
                title: "ُEmail Updated Successfully!",
            })
    }

    function verifyOtb() {
        setStep(REGISTER_STEPS.EMAIL);
    }


return (
    <div className="">
        <div>
            <p className="font-inter font-bold text-[30px] pt-5 leading-[100%] tracking-[0px] text-[#1F2937]">Change Email Adress</p>
            <p className="font-inter font-bold text-[24px] pt-5 leading-[100%] tracking-[0px] align-middle text-[#155DFC] py-3">Verify OTP</p>
            <p className="font-geist-mono font-normal text-[16px] leading-[100%] tracking-[0px] align-middle text-[#6B7280] py-3">Please enter the 6-digits code we have sent to:</p>
            <p className="font-geist-mono font-normal text-[16px] leading-[100%] tracking-[0px] align-middle">@email <Button variant="link" onClick={()=> verifyOtb()}> Edit </Button></p>
        </div>

        <div>
            <FieldLabel className="sr-only" id="otp-code" htmlFor="otp-code">OTP Code</FieldLabel>
                <InputOTP maxLength={6} id="otp-code" onChange={(e)=>setCode(e)}>
                    <InputOTPGroup className="gap-5">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className="gap-5">
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                
            <p className="text-[#6B7280] text-center">You can request another code in: 60s</p>
            <Button onClick={()=>sendTheCode()} type="submit" className="w-full">Verify Code</Button>
        </div>
    </div>
)
}
