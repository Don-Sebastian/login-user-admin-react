import { useParams } from "react-router-dom";
import AdminNavbar from "../../Components/AdminNavbar";
import EditForm from "../../Components/EditForm";

function EditUser() {

    const { id } = useParams();

    return (
        <>
            <AdminNavbar />
            <EditForm id={id} /> 
        </>
    )
}

export default EditUser;