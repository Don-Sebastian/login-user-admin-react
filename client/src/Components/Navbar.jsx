import { useNavigate } from 'react-router-dom';
import '../Components/Navbar.css';
import { PORT_PATH } from '../Config/Config';

function Navbar({ user }) {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between flex-wrap bg-neutral-800 p-6 mt-0" >
      <div className="flex items-center flex-shrink-0 text-white mr-6" >
        <span className="font-semibold text-xl tracking-tight">Home</span>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          
        </div>
        <div>
          <div className="inline-block h-8">
            <img
              className=" h-12 w-12 rounded-full"
              src={user.profileImg ? `${PORT_PATH}/Uploads/${user.profileImg}` : ''}
              alt="profile picture"
              onClick={() => navigate("/profile-image-upload")}
            />
          </div>

          <a
            href="#"
            className="inline-block text-sm ml-10 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            LOGOUT
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;