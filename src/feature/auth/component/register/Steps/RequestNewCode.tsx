
import { useEffect, useState } from "react";
import type { IRegisterStep } from "../../../types/register";
import { REGISTER_STEPS } from "../../../constatns/formConstant";
import { ChevronLeft } from "lucide-react";

interface IOtpVerificationStep {
  setStep: React.Dispatch<React.SetStateAction<IRegisterStep>>;
  message: string
}

export default function RequestNewCode({
  setStep,message
}: IOtpVerificationStep) {
  const [reqAfter, setReqAfter] = useState<number>(60);

  useEffect(() => {
    if (reqAfter === 0) return;

    const timer = setTimeout(() => {
      setReqAfter((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [reqAfter]);

  return (
    <div>
      {reqAfter > 0 ? (
        <p className="text-center text-[#6B7280]">
          {message} {reqAfter}s
        </p>
      ) : (
        <button
          type="button"
          onClick={() => setStep(REGISTER_STEPS.EMAIL)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChevronLeft />
          Request a new code
        </button>
      )}
    </div>
  );
}
