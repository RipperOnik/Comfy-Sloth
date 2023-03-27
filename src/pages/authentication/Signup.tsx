import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useUserContext } from "../../context/user_context";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signup } = useUserContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      passwordRef.current &&
      passwordConfirmRef.current &&
      passwordRef.current.value !== passwordConfirmRef.current.value
    ) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      if (emailRef.current && passwordRef.current) {
        await signup(emailRef.current.value, passwordRef.current.value);
      }

      navigate("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  return (
    <Wrapper>
      <div className="content">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required ref={emailRef} />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required ref={passwordRef} />
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-4">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  required
                  ref={passwordConfirmRef}
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log in</Link>
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
