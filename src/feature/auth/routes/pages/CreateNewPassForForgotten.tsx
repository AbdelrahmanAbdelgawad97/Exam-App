import { Button } from "#components/ui/button";
import { Field, FieldError, FieldLabel } from "#components/ui/field";
import { Input } from "#components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import z from "zod";
import { useResetPassword } from "../../../api/mutations/useResetPassword";


const passwords = z.object({
    newPassword: z.string("PLease entry your Password")
                    .nonempty("Password is required")
                    .min(8,"Password should be at leatest 8 character")
                    .regex(/[A-Z]/,"Password should contain at least one upper case character")
                    .regex(/[a-z]/,"Password should contain at least one lower case character")
                    .regex(/[0-9]/,"Password should contain at least one Number"),
    confirmPassword: z.string("Please Confirm Your Password!")
}).refine((value) => value.newPassword === value.confirmPassword, {
    error: "password dosen't match confirm password",
    path: ["confirmPassword"]
})

type dataPassword = z.infer<typeof passwords>


export default function CreateNewPassForForgotten() {

    const {mutate: resetPassword} = useResetPassword()

    const [searchParam] = useSearchParams();
    const token = searchParam.get("token");

    const {register , formState , handleSubmit} = useForm<dataPassword>({
        defaultValues:{
            newPassword: "",
            confirmPassword: "", 
        },
        resolver: zodResolver(passwords)
    })

    const onSubmit:SubmitHandler<dataPassword> = (value) => {
        
        resetPassword({
            "token": token,
            "newPassword": value.newPassword,
            "confirmPassword": value.confirmPassword
        })
    }


return (
    <div className="space-y-3">
        <h2 className="font-inter text-[#1F2937] text-[30px] font-bold leading-[100%] tracking-normal align-middle">Create New Password</h2>
        <p className="font-geist-mono text-[#6B7280] text-[16px] font-normal leading-[100%] tracking-normal align-middle">Create a new strong password for your account.</p>
        
        <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-169 mx-auto mt-4">

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

            <Button type="submit" variant="default" className="w-full">Reset Your Password</Button>
        </form>
        <div className="w-fit mx-auto">

        <p className="text-[#6B7280]">Dont' have an account? <Link to="/register" className="text-blue-600">Create Yours</Link></p>
        </div>
    </div>
)
}


