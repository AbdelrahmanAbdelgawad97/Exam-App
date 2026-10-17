import { Field, FieldError, FieldLabel } from "#components/ui/field";
import { Input } from "#components/ui/input";
import z from "zod";
import { useState } from "react";
import { Button } from "#components/ui/button";
import { ChevronRight } from "lucide-react";
import  {  REGISTER_STEPS } from './../../auth/constatns/formConstant';
import type { IRegisterStep } from "../../auth/types/register";
import useUpdatedEmailCode from "../../api/mutations/use-updated-email-code";


const emailSchema = z.object({
    newEmail: z.email(),
});

export type emailSchemaType = z.infer<typeof emailSchema>;


type Props = {
    setStep: React.Dispatch<React.SetStateAction<IRegisterStep>>
}

export default function EntryNewEmail({setStep}:Props) {
    
    const [newEmail , setNewEmail] = useState("");
    const [emailError , setEmailError] = useState("");

    
    const {mutate: sendUpdatedEmailOtb } = useUpdatedEmailCode();



    function getEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(newEmail)) {
            
            setStep(REGISTER_STEPS.OTP_VERIFICATION);
            sendUpdatedEmailOtb({"newEmail": newEmail});

        } else {
            setEmailError("Invalid email address");
        }
    }

return (
        <div>
            <p className="font-inter font-bold text-[30px] pt-5 leading-[100%] tracking-[0px] text-[#1F2937]">Change Email</p>
            <p className="font-inter font-bold text-[24px] pt-5 leading-[100%] tracking-[0px] align-middle text-[#155DFC]">Enter your new email</p>

                <Field>
                    <FieldLabel htmlFor="email" className="pt-4">Email</FieldLabel>
                    <Input id="email" onChange={(e) => setNewEmail(e.target.value)} autoComplete="off" /* placeholder="email@example.com" {...register("email")}*/ />
                </Field>
                <FieldError className="py-3">{emailError}</FieldError>
                <Button type="submit" onClick={getEmail} variant="default" className="w-full mt-4"> Next <ChevronRight /></Button>
        </div>
)
}
