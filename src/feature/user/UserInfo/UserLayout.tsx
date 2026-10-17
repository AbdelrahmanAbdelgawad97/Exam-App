import { CircleUserRound, Lock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router'
import { cn } from '../../../shared/lib/utils';

export default function UserLayout() {
    const [profOrPass, setProfOrPass] = useState("profile");
    const navigator = useNavigate();
    function checkProfOrPass(value: string) {
        setProfOrPass(value);
    }
    useEffect(()=>{
        navigator("/userInfo/profile")
    },[])
    return (
    <div className='flex  mt-5 gap-8'>
        <div className='bg-white w-[282px] h-[530px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]'>
            <Link onClick={()=>checkProfOrPass("profile")} to="/userInfo/profile" className={cn('flex items-center gap-3 m-8 w-[234px] h-[44px] p-3 text-[#6B7280] bg-transparent' , profOrPass === "profile" && "text-[#155DFC] bg-[#EFF6FF]")}> <CircleUserRound/> <p> Profile </p></Link>
            <Link onClick={()=>checkProfOrPass("password")} to="/userInfo/UserChangePassword" className={cn('flex items-center gap-3 m-8 w-[234px] h-[44px] p-3 text-[#6B7280] bg-transparent' , profOrPass === "password" && "text-[#155DFC] bg-[#EFF6FF]")}> <Lock/> <p> Change Password </p></Link>
        </div>
        <div className='bg-white w-[724px] h-[530px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]'>
            <Outlet />
        </div>
    </div>
    )
}
