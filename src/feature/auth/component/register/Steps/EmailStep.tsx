import { Field, FieldLabel, FieldError } from "#components/ui/field";
import { Input } from "#components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { ChevronRight } from "lucide-react";
import { useForm, useFormContext, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../schemas/register.schema";
import z from "zod";
import DirectedTo from "../../../shared/component/DirectedTo";
import useSendOtb from "../../../../api/mutations/use-send-otb";
import FormFeedback from "../../../../../shared/components/form-feedback";
import type { IRegisterFormValue, IRegisterStep } from "../../../types/register";
import { REGISTER_STEPS } from "../../../constatns/formConstant";
import { useEffect } from "react";


interface IEmailStepProps {
  setStep: React.Dispatch<React.SetStateAction<IRegisterStep>>
}


const emailStepSchema = registerSchema.pick({email: true});
type EmailStepSchema = z.infer<typeof emailStepSchema>



export default function EmailStep({setStep}: IEmailStepProps) {
  const {setValue, getValues}= useFormContext<IRegisterFormValue>();

  const {isPending, error, mutate: sendOtp} = useSendOtb();


  const {register, handleSubmit, formState, setFocus} = useForm<EmailStepSchema>({
    defaultValues: {
      email: getValues("email"),
    },
    resolver: zodResolver(emailStepSchema),
  })


  const onSubmit: SubmitHandler<EmailStepSchema> = (value) => {
    sendOtp({email: value.email},{
      onSuccess: () => {
        setStep(REGISTER_STEPS.OTP_VERIFICATION);
        setValue("email",value.email);
      }
    });
  }

  useEffect(()=>{
    setFocus("email");
  },[setFocus])

  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel htmlFor="email">Email Adress</FieldLabel>
        <Input id="email" autoComplete="off" placeholder="email@example.com" {...register("email")} />
        {formState.errors.email && <FieldError>{formState.errors.email.message}</FieldError>}
      </Field>

      <FormFeedback className="mt-4">{error?.message}</FormFeedback>
      <Button disabled={!formState.isValid && formState.isSubmitted} isLoading={isPending} type="submit" variant="outline" className="w-full mt-4"> Next <ChevronRight /></Button>

      <DirectedTo haveOrNot={"Already have an account?"} pageName={"Login"} link={"/login"}/>
    </form>
  )
}


