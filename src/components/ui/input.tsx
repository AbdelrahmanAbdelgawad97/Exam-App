import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "../../shared/lib/utils"

function Input({ className , type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        // Layout & Sizing
        "w-full min-w-0 h-11.5 px-2.5 py-1",

        // Appearance
        "border border-gray-200 bg-white hover:border-blue-600",

        // Typography
        "text-base md:text-sm placeholder:text-gray-400 text-gray-800 ",

        // File Input
        "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",

        // States
        "transition-colors outline-none",
        "focus-visible:border-blue-600 focus-visible:ring-3 focus-visible:ring-blue-100",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-400",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",

        // Dark Mode
        "dark:bg-input/30",
        "dark:disabled:bg-input/80",
        "dark:aria-invalid:border-destructive/50",
        "dark:aria-invalid:ring-destructive/40",

        className
      )}
      {...props}
    />
  )
}

function InputOtp({ className, type, value ,...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      maxLength={1}
      data-slot="input"
      className={cn(
        // Layout & Sizing
        "w-[40px] h-[40px] gap-[10px] ",

        // Appearance
        "border border-[1px] border-[#E5E7EB] bg-white hover:border-blue-600 focus:text-blue-600 text-black",

        // Typography
        "text-base text-2xl placeholder:text-gray-400  ",

        // File Input
        "file:inline-flex text-center file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",

        // recieving number only 
        
        // States
        "transition-colors outline-none",
        "focus-visible:border-blue-600 focus-visible:ring-3 focus-visible:ring-blue-100",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-400",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",

        // Dark Mode
        "dark:bg-input/30",
        "dark:disabled:bg-input/80",
        "dark:aria-invalid:border-destructive/50",
        "dark:aria-invalid:ring-destructive/40",

        className
      )}
      {...props}
    />
  )
}

export { Input , InputOtp}
