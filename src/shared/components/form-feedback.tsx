import { CircleX } from "lucide-react";
import { cn } from "../lib/utils";

export default function FormFeedback({className, children ,...props}: React.HTMLAttributes<HTMLDivElement>) {
  if(!children) return null;
  
    return (
    <div className={cn("text-red-500 text-sm h-9.5 flex items-center justify-center bg-red-50 border border-red-600 relative", className)} {...props}>
        <CircleX size={18} className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"/>
        {children}
    </div>
  )
}
