import { useState } from 'react';
import Heading from '../../shared/component/heading';
import type { IRegisterStep } from '../../types/register';
import { REGISTER_STEPS } from '../../constatns/formConstant';
import RegisterForm from '../../component/register/RegisterForm';
import Progress from '../../component/register/Steps/Progress';
// import Progress from '../../component/register/Steps/progress';

export default function RegisterPage() {

    const [step , setStep] = useState<IRegisterStep>(REGISTER_STEPS.EMAIL);
    
  return (
    <div className='w-full max-w-113'>
      {step !== REGISTER_STEPS.EMAIL && <Progress step={step}/>}
        
        <Heading className='mt-3'> Create New Account </Heading >
        <RegisterForm step={step} setStep={setStep}/>
    </div>
  )
}
