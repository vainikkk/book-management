import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOG_OUT" });
  };
  return (
    <Navbar style={{ backgroundColor: "#e4e6eb", boxShadow: "1px 1px 2px grey" }}>
      <Container>
        <Navbar.Brand href="#home">Books</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button variant="outline-secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
