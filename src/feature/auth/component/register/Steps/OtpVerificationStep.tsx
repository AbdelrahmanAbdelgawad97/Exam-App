import { Button } from "#components/ui/button";
import { Controller, useForm, useFormContext, type SubmitHandler } from "react-hook-form";
import SubHidding from "../../SubHidding";
import type { IRegisterFormValue, IRegisterStep } from "../../../types/register";
import { REGISTER_STEPS } from "../../../constatns/formConstant";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "#components/ui/input-otp"
import { FieldLabel } from '#components/ui/field';
import { FieldError } from "#components/ui/field";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFeedback from "../../../../../shared/components/form-feedback";
import useVerifyEmail from "../../../../api/mutations/use-verify-email";
import { ChevronLeft } from "lucide-react";
import RequestNewCode from "./RequestNewCode";

interface IOtpVerificationStep {
  setStep: React.Dispatch<React.SetStateAction<IRegisterStep>>
}

const otbCodeSchema = z.object({
  code: z.string("OTP is Required").length(6, "Please Entry a valid Otp"),
})

type IOtpCodeFormValues = z.infer<typeof otbCodeSchema>

export default function OtpVerificationStep({setStep}: IOtpVerificationStep) {
  
  const {isPending, error , mutate: verifyEmail} = useVerifyEmail();

  const {getValues} = useFormContext<IRegisterFormValue>()

  const {control , formState , handleSubmit} = useForm<IOtpCodeFormValues>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(otbCodeSchema)
  })

  const email = getValues("email");

  const onSubmit: SubmitHandler<IOtpCodeFormValues> = (value) => {
    verifyEmail({email , code: value.code}, {

      onSuccess: () => {
        setStep(REGISTER_STEPS.INFORMATION);
      }
    }
    )
  }

  return (
    <>
      <SubHidding > Verify OTP</SubHidding>
      <p className="font-inter text-xl leading-normal tracking-normal align-middle text-[#6B7280] ">Please enter the 6-digits code we have sent to:<br/><span className="text-gray-950">{email}</span>  
      <Button onClick={()=> setStep(REGISTER_STEPS.EMAIL)} variant="link">Edit</Button></p>

        <form action="" onSubmit={handleSubmit(onSubmit)} className="">
          <FieldLabel className="sr-only" id="otp-code" htmlFor="otp-code">OTP Code</FieldLabel>

          <Controller 
            control={control}
            name="code"
            render={({field})=>
              <InputOTP maxLength={6} {...field} id="otp-code">
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
            }
          />

          {formState.errors.code && <FieldError>{formState.errors.code.message}</FieldError>}
          <RequestNewCode setStep= {setStep} message="You can request another code in:"/>
          <FormFeedback className="mt-8">{error?.message}</FormFeedback>
          <Button disabled={formState.isSubmitted && !formState.isValid} isLoading={isPending} type="submit" className="w-full">Verify Code</Button>
        </form>

    </>
  )
}
