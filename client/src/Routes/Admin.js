import { Route, Routes } from "react-router-dom";
import Dashboard from '../Pages/Admin/Dashboard'
import AdminLogin from "../Pages/Admin/AdminLogin";
import AdminUsers from "../Pages/Admin/AdminUsers";
import EditUser from "../Pages/Admin/EditUser";
import CreateUser from "../Pages/Admin/CreateUserAdmin";

function Admin() {
    return (
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<AdminLogin />} />
        <Route path="admin-users" element={<AdminUsers />} />
        <Route path="edit-user/:id" element={<EditUser />} />
        <Route path="create-user" element={<CreateUser />} />
      </Routes>
    );
}

export default Admin;