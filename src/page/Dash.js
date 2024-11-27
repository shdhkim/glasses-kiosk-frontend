import React from "react";
import GlobalStyle from "../GlobalStyle";
import NavBar from "../layer/Navbar";
import Card from "react-bootstrap/Card";
import { MDBCol, MDBRow, MDBCard } from "mdb-react-ui-kit";
import ScrollToTopButton from "../layer/ScrollToTopButton";
import { useNavigate } from 'react-router-dom';

function Dash(props) {
    const navigate = useNavigate(); // useNavigate 훅 초기화

    return (
        <>
            <GlobalStyle />
            <ScrollToTopButton />
            <NavBar />
            <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
                <div
                    style={{
                        width: "100%",
                        height: "100vh",
                        backgroundImage: 'url("sunglasses.jpg")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    maxWidth: "800px",
                    display: "flex",
                    justifyContent: "center",
                    zIndex: 1
                }}>
                    <Card style={{
                        width: "100%",
                        maxWidth: "95%",
                        height: "400px",
                        position: "relative",
                        boxShadow: "10px 10px 8px rgba(0, 0, 0, 0.1)"
                    }}>
                        <div style={{
                            width: "100%",
                            height: "50%",
                            background: "linear-gradient(180deg, #CCCCCC, white)",
                            position: "absolute",
                            top: 0,
                            left: 0
                        }}>
                            <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: "60px" }}>
                                <h1 style={{ color: "rgb(87 85 85)" }}>
                                    <strong>최고의 안경 어시스턴트를 경험해보세요!</strong>
                                </h1>
                                <div>
                                    <h2 style={{ color: "rgb(100 98 98)", marginTop: "40px" }}>
                                        <strong>안경 추천 키오스크</strong>
                                    </h2>
                                </div>
                                <div style={{
                                    width: "100%", marginTop: "40px", marginBottom: "10px",
                                    display: "flex", justifyContent: "center", alignItems: "center"
                                }}>
                                    <hr style={{ width: "60%", borderTop: "1px solid #999999" }} />
                                </div>
                                <div style={{
                                    width: "100%",
                                    display: "flex", justifyContent: "center", alignItems: "center"
                                }}>
                                    <MDBRow className={"mb-4"}>
                                        <MDBCol>
                                            <MDBCard floating
                                                className={'m-1'}
                                                style={{
                                                    width: "70px",
                                                    height: "70px",
                                                    background: "white",
                                                    borderRadius: "50%",
                                                    padding: "10px",
                                                    border: "2px solid black",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    transition: "background 0.3s"
                                                }}
                                                onClick={() => { navigate('/cameracapture'); }} // 내부 라우팅으로 변경
                                                onMouseEnter={(e) => { e.currentTarget.style.background = "gray"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = "white"; }}>
                                                <img alt={""} src={"camera.png"} width={"50"} height={"50"} />
                                            </MDBCard>
                                            <p><strong style={{ fontSize: '1.2rem' }}>사진촬영</strong></p>
                                        </MDBCol>
                                    </MDBRow>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Dash;