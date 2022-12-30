import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { PORT_PATH } from "../../Config/Config";
import { useCookies } from "react-cookie";


function AdminLogin() {

  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies([]);

    const [value, setValue] = useState({
        email: '',
        password: ''
    })

    const generateError = (err) => {
      toast.error(err, {
        position: "top-right",
      });
  };
  
  useEffect(() => {
    if(cookies.jwtAdmin) navigate('/admin/dashboard')
  }, [])
  
  

    const handleAdminLogin = async(e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(PORT_PATH + '/admin/login', { ...value, }, { withCredentials: true });
            if (data) {
              if (data.errors) {
                const { email, password } = data.errors;
                if (email) generateError(email);
                else if (password) generateError(password);
              } else {
                navigate("/admin/dashboard");
              }
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
      <div className='loginWrap'>
      
      <div className="container">
        <h2 className="text-3xl font-semibold text-center text-blue-700 ">
          Admin Login
        </h2>
        <form onSubmit={handleAdminLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
          >
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
      </div>
    );
}

export default AdminLogin;