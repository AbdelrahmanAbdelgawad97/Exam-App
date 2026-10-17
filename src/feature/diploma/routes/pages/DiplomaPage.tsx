import { Outlet } from "react-router";

import LayoutDiploma from "../../../../shared/components/LayoutDiploma";
import { useState } from "react";
import { cn } from "../../../../shared/lib/utils";
import { Menu } from "lucide-react";
import useUserInfo from "../../../api/quiries/use-user-info";


export default function DiplomaPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useUserInfo();

  const isAdmin = ["ADMIN", "SUPERADMIN"].includes(user?.role?.toUpperCase() ?? "");
  
return (
  <div className="grid grid-cols-12 h-screen">

    <div className="fixed top-4 left-[90%] z-60 lg:hidden">
      <Menu
        onClick={() => setIsOpen(!isOpen)}
        className="w-7 h-7 cursor-pointer text-[#155DFC]"
      />
    </div>

    <div
      className={cn(
        "flex flex-col items-center fixed top-0 left-0 bottom-0 w-full sm:w-[55%] lg:w-[25%] p-4 sm:p-6 md:p-10 transition-transform duration-300 ease-in-out z-50 shadow-xl",

        isAdmin
          ? "bg-[#1F2937]"
          : "bg-[#EFF6FF]",

        isOpen
          ? "translate-x-0"
          : "translate-x-[-120%] md:translate-x-0"
      )}
    >
      <LayoutDiploma />
    </div>

    <div className="col-span-9 bg-[#F9FAFB] p-4 relative sm:left-[0%] lg:left-[33%]">
      <Outlet />
    </div>

  </div>
);
}
