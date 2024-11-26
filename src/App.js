

import {BrowserRouter, Routes, Route} from "react-router-dom";

import React from "react";

import Dash from "./page/Dash";

import CameraCapture from "./page/CameraCapture";
import AnalysisResult from "./page/AnalysisResult";
import GlassesRecommend from "./page/GlassesRecommend";
import UserFeedBack from "./page/UserFeedBack";

function App() {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route index element={<Dash />} />
          
               
                <Route path={"cameracapture"} element={<CameraCapture/>} />
                <Route path={"analysisresult"} element={<AnalysisResult/>} />
                <Route path={"userfeedback"} element={<UserFeedBack/>} />
                <Route path={"glassesrecommend"} element={<GlassesRecommend/>} />
            
            </Routes>
        </BrowserRouter>
    );
}
export default App;
