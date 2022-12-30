import Home from "../Pages/User/Home";
import Login from "../Pages/User/Login";
import Register from "../Pages/User/Register";
import ProfileImageUpload from "../Pages/User/ProfileImageUpload";

const { Routes, Route } = require("react-router-dom");

function User() {
  return (
    <Routes>
      <Route exact index element={<Home />} />
      <Route exact path="register" element={<Register />} />
      <Route exact path="login" element={<Login />} />
      <Route exact path="profile-image-upload" element={<ProfileImageUpload />} />
    </Routes>
  );
}

export default User;
