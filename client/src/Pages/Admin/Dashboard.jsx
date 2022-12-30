import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AdminNavbar from "../../Components/AdminNavbar";
import { PORT_PATH } from "../../Config/Config";
import "../Admin/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies([]);
  useEffect(() => {
    const verifyAdmin = async () => {
      if (!cookies.jwtAdmin) {
        navigate("/admin/login");
      } else {
        const { data } = await axios.post(
          PORT_PATH + "/admin/dashboard",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookies("jwtAdmin");
          navigate("/login");
        } else toast(`Hi ${data.admin}`, { theme: "dark" });
      }
    };
    verifyAdmin();
  }, [cookies, navigate, removeCookies]);

  const logOut = () => {
    removeCookies("jwtAdmin");
    navigate("/admin/login");
  };

  // Admin Navbar

  return (
    <>
      <AdminNavbar />
      <div>
        <div className="private">
          <h1 className="">Admin Home Page</h1>
          <button onClick={logOut}>Log Out</button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Dashboard;
