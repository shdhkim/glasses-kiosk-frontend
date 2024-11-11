import React from "react";
import NavBar from "../layer/Navbar";
import GlobalStyle from "../GlobalStyle";


import SectionUserFeedBack from "../component/CameraCapture/SectionUserFeedBack";

function UserFeedBack(props) {
    return (
        <>
            <GlobalStyle/>
            <NavBar/>
            <div style={{width:"100%", marginBottom:"100px",
                display:"flex", justifyContent:"center", alignItems:"center"}} className="text-center">
                <SectionUserFeedBack />
            </div>
        
        </>
    );
}

export default UserFeedBack;