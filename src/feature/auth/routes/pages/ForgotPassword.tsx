import { Button } from "#components/ui/button";
import { Field, FieldError, FieldLabel } from "#components/ui/field";
import { Input } from "#components/ui/input";
import { ChevronRight } from "lucide-react";
import { useForm ,type SubmitHandler} from "react-hook-form";
import { Link, useNavigate } from "react-router";
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from "react";
import { ExamContext } from "../../../../Context/UseContext";
import useSendPassToMail from "../../../api/mutations/use-passToMail";
// import { resendPassowrToEmail } from "../../../api/auth.api";


const validateEmail = z.object({
    email: z.email(),
})

type emailType = z.infer<typeof validateEmail>

export default function ForgotPassword() {

    const {mutate: resendPassowrToEmail} = useSendPassToMail()

    const setEmailToContext = useContext(ExamContext);
    const navigator = useNavigate();

    const {register , handleSubmit, formState} = useForm<emailType>({
        defaultValues: {
            email: ""
        }, 
        resolver: zodResolver(validateEmail)
    }
)

const sendForgotPassword:SubmitHandler<emailType> = (val) => {
    setEmailToContext?.setEmail(val.email);
    navigator("/forgotPasswordInfo");
    resendPassowrToEmail({
        "email":val.email,
        "redirectUrl": `${window.location.origin}/createNewPassword`
    })
}


return (
    <div className="align-left space-y-7">
        <p className="font-'iner' font-bold text-[30px] leading-none tracking-normal align-middle">Forgot Password</p>
        <p className="font-'Geist_Mono' text-[#6B7280] font-normal text-[16px] leading-none tracking-normal align-middle">Don’t worry, we will help you recover your account.</p>
        
        <form onSubmit={handleSubmit(sendForgotPassword)}>
            <Field className="space-y-5">
                <FieldLabel htmlFor="username" className="font-'Geist_Mono' text-[16px] leading-none tracking-normal font-bold">Email</FieldLabel>
                <Input {...register("email")}  placeholder="user@example.com"/>
                <FieldError>{formState.errors.email?.message}</FieldError>
                <Button type="submit" className="self-end mt-2 w-full"> Next <ChevronRight/> </Button>
            </Field>
        </form>

        <p className="text-[#6B7280]">Dont' have an account? <Link to="/register" className="text-blue-600">Create Yours</Link></p>
    </div>
)
}
