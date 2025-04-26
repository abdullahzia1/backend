import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import the search icon
const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Form onSubmit={submitHandler} className="d-flex mx-auto">
        <InputGroup className="mr-sm-2 ml-sm-5" style={{ minWidth: "40vw", width: '100%'}}>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            placeholder="Search Products..."
            style={{ borderRadius: "200px 0px 0px 200px", background: '#F0F0F0' }}
          />
          <Button type="submit" variant="dark" className="p-2" style={{ borderRadius: "0px 200px 200px 0px", background: "000000d6"}}>
            <FaSearch />
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};

export default SearchBox;
