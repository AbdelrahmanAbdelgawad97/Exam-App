import { useEffect, useState } from "react";

export default function Counter({theExamTimerExported, setEndExam}: {theExamTimerExported: number, setEndExam: React.Dispatch<React.SetStateAction<boolean>>}) {
  const testTime: number= theExamTimerExported * 60
  const [seconds, setSeconds] = useState(testTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  let secondsProgress = (seconds / testTime) * 100;

  if(minutes === 0 && remainingSeconds === 0) {
    setEndExam(true);
  }

  return (
            <div
              className="relative flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(
                  #155DFC ${secondsProgress}%,
                  #EFF6FF ${secondsProgress}% 100%
                )`,
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <span className="font-mono text-[14px] font-normal">
                  {String(minutes).padStart(2, "0")}:
                  {String(remainingSeconds).padStart(2, "0")}
                </span>
              </div>
          </div>
  );
}