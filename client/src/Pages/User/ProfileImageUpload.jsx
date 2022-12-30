import { useState } from "react";
import ImageUpload from "../../Components/ImageUpload";
import Navbar from "../../Components/Navbar";


function ProfileImageUpload() {
    const [profileImg, setProfileImg] = useState("");

    return (
      <>
        <ImageUpload props={{ profileImg, setProfileImg }} />
      </>
    );
}

export default ProfileImageUpload;