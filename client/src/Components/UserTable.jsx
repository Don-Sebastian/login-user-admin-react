import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { PORT_PATH } from "../Config/Config";
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css";

function UserTable() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies([]);
  const [search, setSearch] = useState('')
  const [userList, setUserList] = useState([]);
  let [reRender, setReRender] = useState(0)

  const [alert, setAlert] = useState({
    type: "error",
    text: "This is a alert message",
    show: false,
  });

  const generateError = (error) => {
    console.log(error);
  };

  const editUser = (userId) => navigate("/admin/edit-user/" + userId);

  const deleteUserBackend = async (userId) => {
    const { data } = await axios.delete(PORT_PATH + "/admin/delete-user/"+userId, {
            withCredentials: true,
    });
        if (!data.verifiedAdmin) navigate("/admin/login");
        else {
          if (data.error) generateError(data.error);
          else setReRender(++reRender);
            // navigate("/admin/admin-users");
        }
  }

  const deleteUser = (userId) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {deleteUserBackend(userId); },
        },
        {
          label: "No",
          onClick: () => console.log("Don't delete"),
        },
      ],
    });
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const searchData = userList.filter((userSearched) => userSearched.email.includes(search))
  console.log(searchData);

  useEffect(() => {
    
    const verifyAdmin = async () => {
      
      if (!cookies.jwtAdmin) navigate("/admin/login");
      else {
        const { data } = await axios.get(PORT_PATH + "/admin/user-list", {
          withCredentials: true,
        });
        if (!data.verifiedAdmin) navigate("/admin/login");
        else {
          if (data.error) generateError(data.error);
          else {
            const allUsers = data.users.map((user) => {
              return {
                ...user,
              };
            });
            setUserList(allUsers);
          }
        }
      }
    };
    verifyAdmin();
  }, [reRender]);

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="flex justify-evenly mt-20">
              <button
                onClick={() => navigate("/admin/create-user")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create User
              </button>
              <div>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="search"
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="mx-auto w-full max-w-screen-md mt-20 overflow-hidden border rounded-lg">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      ID
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Edit
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {searchData.map((user, index) => {
                    return (
                      <tr key={user._id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {++index}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <div
                            id={user._id}
                            onClick={() => editUser(user._id)}
                            className="text-green-500 hover:text-green-700"
                          >
                            Edit
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <div
                            onClick={() => deleteUser(user._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
