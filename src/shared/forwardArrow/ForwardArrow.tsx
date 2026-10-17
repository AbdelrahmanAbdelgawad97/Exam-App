import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router'

export default function ForwardArrow({prop}: {prop: string}) {
  return (
    <div>
        <Link to={`${prop}`}>
            <ChevronLeft  className="h-19.25 mt-4 w-9.75 border border-[#155DFC] text-[#155DFC] "/>
        </Link>
    </div>
  )
}
