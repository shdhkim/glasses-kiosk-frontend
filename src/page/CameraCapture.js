import React from "react";
import NavBar from "../layer/Navbar";
import GlobalStyle from "../GlobalStyle";


import SectionCameraCapture from "../component/CameraCapture/SectionCameraCapture";

function CameraCapture(props) {
    return (
        <>
            <GlobalStyle/>
            <NavBar/>
            <div style={{width:"100%",   display:"flex", justifyContent:"center", alignItems:"center"}} className="text-center">
                <SectionCameraCapture />
            </div>
        
        </>
    );
}

export default CameraCapture;