import React from "react";
import NavBar from "../layer/Navbar";
import GlobalStyle from "../GlobalStyle";



import SectionAnalysisResult from "../component/CameraCapture/SectionAnalysisResult";

function AnalysisResult(props) {
    return (
        <>
            <GlobalStyle/>
            <NavBar/>
            <div style={{width:"100%",
                display:"flex", justifyContent:"center", alignItems:"center"}} className="text-center">
                <SectionAnalysisResult />
            </div>
        
        </>
    );
}

export default AnalysisResult;