import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function AdminNavbar() {
  const navigate = useNavigate();
  // const [cookies, setCookies, removeCookies] = useCookies([]);

  const adminLogout = () => {
    // console.log(cookies.jwtAdmin);
    // removeCookies("jwtAdmin");
    // navigate("/admin/login");
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-neutral-800 p-6  w-full">
      <div
        className="flex items-center flex-shrink-0 text-white mr-6"
        onClick={() => navigate("/admin/dashboard")}
      >
        <span className="font-semibold text-xl tracking-tight">Home</span>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <div onClick={() => navigate('/admin/admin-users')}
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Users
          </div>
        </div>
        <div>
          <div className="inline-block h-8">
            {/* <img
              className=" h-12 w-12 rounded-full"
              src={
                user.profileImg ? `${PORT_PATH}/Uploads/${user.profileImg}` : ""
              }
              alt="profile picture"
              onClick={() => navigate("/profile-image-upload")}
            /> */}
          </div>

          <div onClick={adminLogout}
            className="inline-block text-sm ml-10 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            LOGOUT
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
