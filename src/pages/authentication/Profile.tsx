import React, { useState } from "react";
import { Card, Alert, Stack } from "react-bootstrap";
import { useUserContext } from "../../context/user_context";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useUserContext();
  const navigate = useNavigate();
  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <Wrapper>
      <div className="content">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email: </strong>
            {currentUser && currentUser.email}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <Stack
          className="w-100 text-center mt-2 justify-content-center"
          gap={4}
          direction="horizontal"
        >
          <div className="navigate-btn" onClick={handleLogout}>
            Log out
          </div>
          <Link to="/">Dashboard</Link>
        </Stack>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: white;
  .content {
    width: 100%;
    max-width: 400px;
  }
  .navigate-btn {
    color: var(--bs-link-color);
    cursor: pointer;
  }
  .navigate-btn:hover {
    color: var(--bs-link-hover-color);
  }
`;
