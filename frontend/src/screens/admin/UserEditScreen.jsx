import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("user updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1
          style={{
            textAlign: "start",
            fontSize: "45px",
            fontWeight: "700",
            color: "#000000",
            margin: "60px 0px",
          }}
        >
          Edit User
        </h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label
                style={{
                  textAlign: "start",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#000000",
                }}
              >
                Name
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

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
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                style={{
                  textAlign: "start",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#000000",
                }}
              ></Form.Check>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
