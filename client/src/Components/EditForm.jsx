import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { PORT_PATH } from "../Config/Config";

function EditForm({ id }) {
    
    const navigate = useNavigate();
    const [edit, setEdit] = useState({})
    const [userDetails, setuserDetails] = useState({})
    const [cookies, setCookies, removeCookies] = useCookies([]);

    const generateError = (err) => console.log(err);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post(PORT_PATH + "/admin/edit-user", { userDetails, edit}, {
            withCredentials: true,
        });
        if (!data.verifiedAdmin) navigate("/admin/login");
        else {
          if (data.error) generateError(data.error);
          else navigate("/admin/admin-users");
        }
    }

    useEffect(() => {
        const verifyAdmin = async () => {
            if (!cookies.jwtAdmin) navigate('/admin/login');
            else {
                const { data } = await axios.get(PORT_PATH + '/admin/edit-user/' + id, { withCredentials: true })
                if (!data.verifiedAdmin) navigate("/admin/login");
                else {
                  if (data.error) generateError(data.error);
                  else {
                      setEdit(data.user);
                      setuserDetails(data.user);
                  } 
                }
            }
        }
        verifyAdmin();
    }, [])
        
    return (
      <div className="mx-auto w-full max-w-md mt-20">
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 mb-6 w-full group mt-20">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e) => setEdit({ email: e.target.value })}
              value={edit.email}
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    );
}

export default EditForm