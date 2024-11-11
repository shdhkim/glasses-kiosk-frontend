import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import React from "react";
import {ButtonGroup} from "reactstrap";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";

function NavBar(props) {

    return (
        <div id="Navigation" style={{width:"100%", background:"#87CEEB",  // Sky blue background
            position: "fixed", zIndex: "100" }}>
            <Navbar expand="lg" style={{background:"#87CEEB", marginLeft:"100px", height: "80px"}}>
                <Container fluid style={{marginLeft: "0px"}}>
                    <Navbar.Brand href="/">
                        <img alt="" src="/home2.png"
                             width="40" height="40"
                             className="d-inline-block align-top"
                             style={{border:"1px solid white", borderRadius:"8px"}}
                        />{' '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px'}}
                            navbarScroll
                        >
                            <Nav.Link href="/cameracapture" style={{ fontSize: '1.5rem' }}>사진촬영</Nav.Link>
                        </Nav>
                        <ButtonGroup style={{ marginRight: "100px" }}>
                            <Button href={"/"} style={{ color: "white", fontWeight: "bold", background:"black", borderColor:"black" }}>
                                D A V I C H
                            </Button>
                        </ButtonGroup>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;