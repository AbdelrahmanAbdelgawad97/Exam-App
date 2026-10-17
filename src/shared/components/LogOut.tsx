import { CircleUserRound, Settings, UserRound } from "lucide-react"
import { Button } from "#components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "#components/ui/dropdown-menu"
import useUserInfo from "../../feature/api/quiries/use-user-info"
import LogOutComponent from "../../feature/user/LogOutComponent/LogOutComponent"
import { cn } from "../lib/utils"

export function LogOutMenu() {

    
    const {data: user, data} = useUserInfo();
    const isAdmin = user?.role === "ADMIN";


return (
    <DropdownMenu>
        <DropdownMenuTrigger render={
            <Button className={"bg-transparent border-0 hover:bg-transparent"} >
                <div>
                    <CircleUserRound className="size-10 text-black"/>
                </div>
                <div className="flex flex-col items-start gap-1">
                    <p className={cn("text-[#155DFC] font-medium", isAdmin && "text-white" )}>{data?.firstName}</p>
                    <p className="text-[#6B7280]">{data?.email}</p>
                </div>
            </Button>} />
        <DropdownMenuContent className="min-w-56">
        
            <DropdownMenuGroup>
            <div>
                <img src="" alt="" />
            </div>
            <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem value="" className="cursor-pointer">
                <UserRound /> Account
                </DropdownMenuRadioItem>
        
                <DropdownMenuRadioItem value="" className="cursor-pointer">
                <Settings />
                Dashboard
                </DropdownMenuRadioItem>
        
                <DropdownMenuRadioItem value="" 
                    render={
                        <LogOutComponent />
                    }
                >
                </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
)
}

