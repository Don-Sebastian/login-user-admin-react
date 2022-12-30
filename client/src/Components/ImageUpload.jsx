import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { PORT_PATH } from "../Config/Config";

function ImageUpload({ props }) {
  const [file, setFile] = useState({
    profile: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    console.log(e.target.files);
    props.setProfileImg(e.target.files[0]);
    setFile({ ...file, profile: e.target.files[0] });
  }

  const generateError = (error) => {
    toast.error(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const generateSuccess = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      navigate("/");
    }, 3000)
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file.profile);
    const { data } = await axios.post(PORT_PATH + "/update-image", formData, {
      withCredentials: true,
    });
    if (!data.verified) navigate("/login");
    else {
      if (!data.updation) {
        if (data.error == "Cannot read properties of undefined (reading 'filename')") generateError('Do not leave the field blank')
        else generateError(data.error)
       }else generateSuccess('Profile Image Updated')
    }
  };

  return (
    <div className="imageupload max-w-screen-sm mx-auto mt-52">
      <div className="ml-40">Add Image:</div>
      <div className="mt-16 h-10 flex justify-center items-center">
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <input type="file" onChange={handleChange} name="Image" />
          <button
            type="submit"
            className="px-4 py-2 tracking-wide text-center text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-white-600 focus:outline-none focus:bg-neutral-600"
          >
            Submit
          </button>
        </form>
      </div>
      <img
        src={props.profileImg ? URL.createObjectURL(props.profileImg) : ""}
      />
      <ToastContainer />
    </div>
  );
}

export default ImageUpload;
