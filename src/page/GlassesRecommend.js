import React from "react";
import NavBar from "../layer/Navbar";
import GlobalStyle from "../GlobalStyle";



import SectionGlassesRecommend from "../component/CameraCapture/SectionGlassesRecommend";
function GlassesRecommend(props) {
    return (
        <>
            <GlobalStyle/>
            <NavBar/>
            <div style={{width:"100%",
                display:"flex", justifyContent:"center", alignItems:"center"}} className="text-center">
                <SectionGlassesRecommend />
            </div>
        
        </>
    );
}

export default GlassesRecommend;