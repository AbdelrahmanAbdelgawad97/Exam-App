import { useNavigate } from "react-router"
import { Button } from "#components/ui/button";
import { LogOutIcon} from "lucide-react"
import useDeleteQueries from "../../api/quiries/use-delete-quiers";
import useToken from "../../../hooks/use-token";

export default function LogOutComponent() {
    const navigation = useNavigate();
    const deleteQueries = useDeleteQueries();
    const { removeToken } = useToken();

    function LogOut() {
      removeToken();
      deleteQueries();
      navigation("/login");
      
    }
  return (
    <Button className="text-red-600 bg-white w-full hover:bg-black/10 h-8" onClick={()=>LogOut()}>
        <LogOutIcon className="rotate-180" />
        Logout
    </Button>
  )
}
