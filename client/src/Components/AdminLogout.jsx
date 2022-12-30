import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function AdminLogout() {

    const navigate = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies([]);

    const adminLogout = () => {
      removeCookies("jwtAdmin");
      navigate("/admin/login");
    };
  return <></>;
}

export default AdminLogout;
