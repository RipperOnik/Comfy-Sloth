import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useUserContext } from "../../context/user_context";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null);

  const { resetPassword } = useUserContext();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      if (emailRef.current) {
        await resetPassword(emailRef.current.value);
      }
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }
  return (
    <Wrapper>
      <div className="content">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Password Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required ref={emailRef} />
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                Reset password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign up</Link>
        </div>
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
`;
