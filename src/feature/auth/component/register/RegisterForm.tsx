
import EmailStep from './Steps/EmailStep'

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IRegisterFormValue, IRegisterStep } from '../../types/register';
import { registerSchema } from '../../schemas/register.schema';
import type { SetStateAction } from 'react';
import { REGISTER_STEPS } from './../../constatns/formConstant';
import OtpVerificationStep from './Steps/OtpVerificationStep';
import InformationStep from './Steps/InformationStep';
import PasswordStep from './Steps/PasswordStep';


interface IRegisterFormPage {
  step: IRegisterStep,
  setStep: React.Dispatch<SetStateAction<IRegisterStep>>
}

export default function RegisterForm({step, setStep}: IRegisterFormPage) {
  const  form = useForm<IRegisterFormValue>({
    defaultValues: {
      email:"",
      username:"",
      password:"",
      firstName:"",
      lastName:"",
      phone:"",
    },
    resolver: zodResolver(registerSchema),
  })


  const render = () => {
    switch(step) {
        case REGISTER_STEPS.EMAIL:
            return <EmailStep  setStep={setStep}/>;

        case REGISTER_STEPS.OTP_VERIFICATION:
            return <OtpVerificationStep setStep={setStep}/>;

        case REGISTER_STEPS.INFORMATION:
            return <InformationStep setStep={setStep}/>;

        case REGISTER_STEPS.PASSWORD:
            return <PasswordStep setStep={setStep}/>;
    }
  }

    
  return (

    <FormProvider {...form}>
        <div className='mt-4'>
            {render()}
        </div>
    </FormProvider>

  )
}

