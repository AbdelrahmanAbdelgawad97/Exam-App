import { ChevronLeft } from "lucide-react";

export default function SectionsTitle({children}: {children: React.JSX.Element}) {
  return (
    <>

        <div className="flex items-center gap-4 mt-4">
          {/* {arrow && 
            <ChevronLeft  className="h-[77px] w-[39px] border border-[1px] border-[#155DFC] text-[#155DFC] "/>
          } */}
            <div className="flex items-center justify-start pl-4 h-[77px] w-[982px] gap-4 font-semibold font-semibold text-3xl bg-blue-600 text-white">
                {children}
            </div>

        </div>
    </>
  )
}
