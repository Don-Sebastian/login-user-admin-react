import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { PORT_PATH } from "../../Config/Config";
import Navbar from "../../Components/Navbar";
import '../User/Home.css'

function Home() {

  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState('');
  const [cookies, setCookies, removeCookies] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          PORT_PATH,
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookies("jwt");
          navigate("/login");
        } else {
          setProfileImg(data.user.Image)
          console.log(profileImg);
          toast(`Hi ${data.user.email}`, {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } 
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookies]);

  const logOut = () => {
    removeCookies("jwt");
    navigate("/login");
  };

  return (
    <>
      <Navbar user={{ profileImg }} />
      <div>
        <div className="privateAdmin">
          <>
            <h1 className="h1User">Home Page</h1>
            <button className="buttonUser" onClick={logOut}>Log Out</button>
          </>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Home;
