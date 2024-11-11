import React, {useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import axios from "axios";

function SearchBar(props) {
    const [searchValue, setSearchValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // 검색 버튼 클릭 시 부모 컴포넌트로 검색값 전달
        axios.get(`${props.url}?stockName=${searchValue}`)
            .then((response) => {
                props.onSearch(response.data); // 부모 컴포넌트에 전달할 데이터
            })
            .catch((error) => {
                console.error("Error fetching data[SearchBar]:", error);
            });
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div id={"Header-Search"} style={{marginTop:"20px"}}>
            <Form className={"d-flex"} onSubmit={handleSubmit} style={{
                display:"flex", justifyContent:"center", alignItems:"center"
            }}>
                <Form.Control
                    style={{
                        width:`${props.barWidth}`, border: "3px solid darkgray"
                }}
                    type={"search"}
                    placeholder={"(ex: 종목코드, 종목명)"}
                    className={"mb-4"}
                    aria-label={"Search"}
                    name={props.name}
                    value={searchValue}
                    onChange={handleChange}
                />
                <Button type={"submit"} variant={"outline-dark"} style={{height:"40px",marginBottom:"25px"}}>검색</Button>
            </Form>
        </div>
    );
}

export default SearchBar;