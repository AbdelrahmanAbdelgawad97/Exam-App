import { cn } from "../../../../../shared/lib/utils";
import { REGISTER_STEPS } from "../../../constatns/formConstant";
import type { IRegisterStep } from "../../../types/register";

interface IStepsProgressProps {
    step: IRegisterStep,
}

export default function Progress({step}: IStepsProgressProps) {

    const stepIndexs = {
        [REGISTER_STEPS.EMAIL]: 1,
        [REGISTER_STEPS.OTP_VERIFICATION]: 2,
        [REGISTER_STEPS.INFORMATION]: 3,
        [REGISTER_STEPS.PASSWORD]: 4,
    };

    const stepIndex =  stepIndexs[step];

    return (
    <div className="flex items-center justify-between my-3">
        {Array.from({length: 4}, (_,i) => i+1).map((i) => (
            <span key={i}
                className={cn(
                    "relative size-2.5 rotate-45 border border-blue-600 bg-[#EFF6FF]",
                    
                    stepIndex >= i && "before:absolute border-blue-600 bg-blue-600",
                    
                    i !== 1 &&  "before:absolute before:content-[''] before:top-1/2 before:-translate-y-1/2 before:right-full before:w-20 before:-rotate-45 before:border before:border-t before:border-blue-600",
                    
                    stepIndex < i && "before:border-dashed",
                    
                    stepIndex === i && "shadow-[0_0_0_0.4rem_var(--color-blue-100)]",
                    
                    
                )}
            />
        ))}
    </div>
)
}
