import { TriangleAlert, X } from "lucide-react"
import { cn } from "../../../shared/lib/utils"
import { Button } from "#components/ui/button"
import useDeleteTheUserAccount from "../../api/mutations/use-delete-own-account";
import { useNavigate } from "react-router";


interface Props {
    setDeleteUserAccount: React.Dispatch<React.SetStateAction<boolean>> ,
}

export default function DeleteUserAccount({setDeleteUserAccount}: Props) {

    const {mutate: deleteOwnAccount} = useDeleteTheUserAccount();
    const navigatore = useNavigate();

    function deleteTheAccount() {
        navigatore("/login");
        deleteOwnAccount();
    }

    return (
        <>
            <div>
                <div className="fixed inset-0 z-[99] bg-black/50" />
                    <div
                        className={cn(
                            "w-[40rem] h-[22rem]",
                            "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
                            "fixed top-1/2 left-1/2 z-[100]",
                            "-translate-x-1/2 -translate-y-1/2",
                            "p-6"
                        )}
                        >

                        <div>
                            <X onClick={()=> setDeleteUserAccount(false)} className="absolute right-[2%] cursor-pointer"/>
                        </div>

                        <div className="mt-10 space-y-3">
                            <div className="w-fit mx-auto text-[#DC2626] bg-[#FEE2E2] p-8 rounded-full "><TriangleAlert className="size-[3rem]"/></div>
                            <p className="text-center text-[#DC2626]">Are you sure you want to delete your account?</p>
                            <p className="text-center text-[#6B7280]">This action is permanent and cannot be undone.</p>
                            <div className="w-full text-center">
                                <Button className="w-[45%]" variant="secondary" onClick={() => setDeleteUserAccount(false)}> Cancel </Button>
                                <Button className="w-[45%]" variant="destructive" onClick={() => deleteTheAccount()}> Yes, delete </Button>
                            </div>
                        </div>
                    </div>

            </div>
        </>
    )
}
