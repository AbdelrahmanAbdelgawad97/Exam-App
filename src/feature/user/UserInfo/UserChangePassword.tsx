import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import {useForm, type SubmitHandler } from "react-hook-form";
import {  FieldLabel } from '#components/ui/field';
import { FieldError } from "#components/ui/field";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "#components/ui/field";
import useChangePassword from "../../api/mutations/use-change-password";



const passwordSchema = z.object({
  currentPassword: z.string("PLease entry your Current Password").nonempty("Password is required"),

  newPassword: z.string("PLease entry your Password")
      .nonempty("Password is required")
      .min(8,"Password should be at leatest 8 character")
      .regex(/[A-Z]/,"Password should contain at least one upper case character")
      .regex(/[a-z]/,"Password should contain at least one lower case character")
      .regex(/[0-9]/,"Password should contain at least one Number"),

  confirmPassword: z.string("Confirm Password is Requierd"),

}).refine((value) => value.newPassword === value.confirmPassword, {
    error: "password dosen't match confirm password",
    path: ["confirmPassword"]
})

export type IpasswordFormValues = z.infer<typeof passwordSchema>

export default function UserChangePassword() {

  const {mutate: userChangePassword } = useChangePassword();
  

  const {register , formState , handleSubmit, reset } = useForm<IpasswordFormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(passwordSchema)
  })

  const onSubmit: SubmitHandler<IpasswordFormValues> = (value) => {
    userChangePassword(value);
    reset();
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-169 mx-auto mt-4">
        
        <Field>
          <FieldLabel htmlFor="password" className="text-[#1F2937]">Current password</FieldLabel>
          <Input type="password" id="password" {...register("currentPassword")} placeholder="Current password "/>
          {formState.errors.currentPassword && <FieldError>{formState.errors.currentPassword?.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="password" className="text-[#1F2937]">New password</FieldLabel>
          <Input type="password" id="password" {...register("newPassword")} placeholder="New password"/>
          {formState.errors.newPassword && <FieldError>{formState.errors.newPassword?.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword" className="text-[#1F2937]">Confirm New password</FieldLabel>
          <Input type="password" id="lastName" {...register("confirmPassword")} placeholder="Confirm New password"/>
          {formState.errors.confirmPassword && <FieldError>{formState.errors.confirmPassword.message}</FieldError>}
        </Field>

        <Button type="submit" variant="default" className="w-full">Update Password</Button>
      </form>
    </>
  )
}
