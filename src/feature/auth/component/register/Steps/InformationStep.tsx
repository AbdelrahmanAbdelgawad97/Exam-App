import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import {Controller, useForm, useFormContext, type SubmitHandler } from "react-hook-form";
import SubHidding from "../../SubHidding";
import type { IRegisterStep } from "../../../types/register";
import { REGISTER_STEPS } from "../../../constatns/formConstant";

import { FieldGroup, FieldLabel } from '#components/ui/field';
import { FieldError } from "#components/ui/field";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../schemas/register.schema";
import { Field } from "#components/ui/field";
import { PhoneInput } from "#components/ui/PhoneInput";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RequestNewCode from "./RequestNewCode";


interface IInformationStep {
  setStep: React.Dispatch<React.SetStateAction<IRegisterStep>>
}

const informationSchema = registerSchema.pick({
  firstName: true,
  lastName: true,
  username: true,
  phone: true,
})

type IInformationFormValues = z.infer<typeof informationSchema>

export default function InformationStep({setStep}: IInformationStep) {
  
  const {getValues, setValues} = useFormContext<IInformationFormValues>()

  const {register , control , formState , handleSubmit} = useForm<IInformationFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
    },
    // defaultValues: async () => {
    //   const previuseValues = getValues();

    //   return  {
    //   firstName: previuseValues.firstName,
    //   lastName: previuseValues.lastName,
    //   username: previuseValues.username,
    //   phone: previuseValues.phone,
    // }
    // },
    resolver: zodResolver(informationSchema)
  })


  const onSubmit: SubmitHandler<IInformationFormValues> = (values) => {
    setValues({
      ...getValues(),
      ...values,
    })
    setStep(REGISTER_STEPS.PASSWORD);
  }

  return (
    <>
      <SubHidding > Tell Us More About You</SubHidding>

      <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-10 mt-15">
          
          <FieldGroup className="grid grid-cols-2">
            <Field>
              <FieldLabel htmlFor="firstName">First Name <span className="text-red-600">*</span></FieldLabel>
              <Input type="text" id="firstName" {...register("firstName")} placeholder="First Name"/>
              {formState.errors.firstName && <FieldError>{formState.errors.firstName.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="lastName">Last Name <span className="text-red-600">*</span></FieldLabel>
              <Input type="text" id="lastName" {...register("lastName")} placeholder="Last Name"/>
              {formState.errors.lastName && <FieldError>{formState.errors.lastName.message}</FieldError>}
            </Field>
          </FieldGroup>

            <Field>
              <FieldLabel htmlFor="username">Username<span className="text-red-600">*</span></FieldLabel>
              <Input type="text" className="w-full" id="username" {...register("username")} placeholder="User Name"/>
              {formState.errors.username && <FieldError>{formState.errors.username.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Controller 
                control={control}
                name="phone"
                render={({field , formState})=>
                
                  <PhoneInput 
                    type="text" 
                    className="w-full" 
                    value={field.value} 
                    onChange={field.onChange} 
                    disabled={field.disabled} 
                    placeholder="Phone Number" 
                    defaultCountry="EG" 
                    aria-invalid={!!formState.errors.phone}/>
                }
              />
              {formState.errors.phone && <FieldError>{formState.errors.phone.message}</FieldError>}
            </Field>
            <RequestNewCode setStep= {setStep} message="Entry Data Before 60s"/>
          <Button disabled={formState.isSubmitted && !formState.isValid} type="submit" variant="outline" className="w-full">Next <ChevronRight /></Button>
      </form>

    </>
  )
}
