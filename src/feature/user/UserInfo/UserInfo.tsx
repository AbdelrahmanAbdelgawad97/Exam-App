import { UserRound } from "lucide-react";
import PageTitle from "../../../shared/components/PageTitle";
import SectionsTitle from "../../../shared/components/SectionsTitle";
import UserLayout from "./UserLayout";

export default function UserInfo() {
  return (
    <>
      <PageTitle> Account </PageTitle>
      
      <SectionsTitle> 
        <>
          <UserRound className="w-10 h-10" />
          <p className="">Account Settings</p>
        </>  
      </SectionsTitle>
      <UserLayout />
    </>
  )
}
