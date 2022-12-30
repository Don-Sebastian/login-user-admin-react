import UserTable from "../../Components/UserTable";

const { default: AdminNavbar } = require("../../Components/AdminNavbar");

function AdminUsers() {
    return (
      <>
        <AdminNavbar />
        <UserTable />
      </>
    );
}

export default AdminUsers;