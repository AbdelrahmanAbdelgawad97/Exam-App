import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import {useForm, useFormContext, type SubmitHandler } from "react-hook-form";
import SubHidding from "../../SubHidding";
import {  FieldLabel } from '#components/ui/field';
import { FieldError } from "#components/ui/field";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../schemas/register.schema";
import { Field } from "#components/ui/field";
import useCreateAccount from "../../../../api/mutations/use-create-account";
import { ChevronLeft } from "lucide-react";
import type { IRegisterStep } from "../../../types/register";
import { REGISTER_STEPS } from "../../../constatns/formConstant";
import RequestNewCode from "./RequestNewCode";

interface IPasswordStep {
  setStep: React.Dispatch<React.SetStateAction<IRegisterStep>>
}

const passwordSchema = registerSchema.pick({
  password: true,
  confirmPassword: true,
}).refine((value) => value.password === value.confirmPassword, {
    error: "password dosen't match confirm password",
    path: ["confirmPassword"]
})

type IpasswordFormValues = z.infer<typeof passwordSchema>

export default function passwordStep({setStep}: IPasswordStep) {
  
  const {isPending ,error , mutate: createAccount} = useCreateAccount();

  const {getValues, setValues} = useFormContext<IpasswordFormValues>()

  const {register , formState , handleSubmit} = useForm<IpasswordFormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(passwordSchema)
  })


  const onSubmit: SubmitHandler<IpasswordFormValues> = (values) => {
    
    const allData = {
      ...getValues(),
      ...values,
    };
    setValues(allData);
    createAccount(allData);
    // createAccount(allData, {
    //   onError: (error) => {
    //     if (error.message === "This Phone number is already exist") {
    //       setError("phone", {message: error.message}, {shouldFocus: true});
    //       setStep(REGISTER_STEPS.INFORMATION);
    //     }
    //   }
    // });
  }

  return (
    <>
        <SubHidding> Create Strong password</SubHidding>

        <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-10 mt-15">
          
            <Field>
              <FieldLabel htmlFor="password">password <span className="text-red-600">*</span></FieldLabel>
              <Input type="password" id="password" {...register("password")} placeholder="First Name"/>
              {formState.errors.password && <FieldError>{formState.errors.password.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm You password <span className="text-red-600">*</span></FieldLabel>
              <Input type="password" id="lastName" {...register("confirmPassword")} placeholder="Last Name"/>
              {formState.errors.confirmPassword && <FieldError>{formState.errors.confirmPassword.message}</FieldError>}
            </Field>

            <RequestNewCode setStep= {setStep} message="Create a password before 60s"/>
            
            <FieldError>{error?.message}</FieldError>

          <Button isLoading={isPending}  disabled={formState.isSubmitted && !formState.isValid} type="submit" variant="default" className="w-full">Create Account</Button>
        </form>

    </>
  )
}
