import { cn } from "../../../../shared/lib/utils"

export default function Heading({className, ...props}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <>
      <h1 className={cn("text-3xl font-bold font-inter", className)} {...props}></h1>

    </>
  )
}
