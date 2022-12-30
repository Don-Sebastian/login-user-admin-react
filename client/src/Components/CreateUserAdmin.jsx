import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { PORT_PATH } from "../Config/Config";

function CreateUserAdmin(params) {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const generateError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        PORT_PATH + "/admin/create-user-backend",
        {
          ...value,
        },
        {
          withCredentials: true,
        }
      );
      if (data) {
        if (!data.verifiedAdmin) navigate("/admin/login");
        else {
            if (data.error) {
              const { email, password } = data.error;
              if (email) generateError(email);
              else if (password) generateError(password);
            } else {
              navigate("/admin/admin-users");
            }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginWrap">
      <div className="container">
        <h2 className="text-3xl font-semibold text-center text-blue-700 ">
          Create User
        </h2>
        <form onSubmit={handleSubmit}>
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

export default CreateUserAdmin;
