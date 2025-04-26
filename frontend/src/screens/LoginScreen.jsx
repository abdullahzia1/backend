import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1
        style={{
          textAlign: "Start",
          fontSize: "45px",
          fontWeight: "600",
          color: "#000000",
          margin: "60px 0px",
        }}
      >
        Sigin In
      </h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label
            style={{
              textAlign: "start",
              fontSize: "20px",
              fontWeight: "600",
              color: "#000000",
            }}
          >
            Email Address
          </Form.Label>
          <Form.Control
            style={{
              border: "1px solid rgba(0, 0, 0, 0.35)",
              borderRadius: "20px",
            }}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label
            style={{
              textAlign: "start",
              fontSize: "20px",
              fontWeight: "600",
              color: "#000000",
            }}
          >
            Password
          </Form.Label>
          <Form.Control
            style={{
              border: "1px solid rgba(0, 0, 0, 0.35)",
              borderRadius: "20px",
            }}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type="submit"
          style={{
            fontSize: "20px",
            fontWeight: "300",
            color: "#ffff",
            textAlign: "center",
            border: "1px Solid black",
            background: "black",
            borderRadius: "200px",
            margin: "20px 0px",
            padding: "10px 25px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          Sign In
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
