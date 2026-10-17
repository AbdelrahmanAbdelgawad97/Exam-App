import React from 'react'
import { cn } from '../../../shared/lib/utils'

export default function SubHidding({className, ...props}:React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <h2 className={cn("font-inter my-3 text-2xl font-bold leading-none tracking-normal align-middle text-[#155DFC]", className)} {...props}/>
  )
}
