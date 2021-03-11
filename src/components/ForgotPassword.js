import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/Authcontext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {

  const emailRef = useRef();
  const [error, setError] = useState("");
  const {resetPassword} = useAuth()
  const [message, setMessage] = useState(false);

  async function handleReset(e) {
    e.preventDefault();

    try {
        setMessage("")
        setError("");
        await resetPassword(emailRef.current.value)
        setMessage("Check your email box for password reset email !!")
    } catch {
        setError("Failed to Send Reset Email. Check the Email you've entered or Try Again later.");
    }
  }

  return (
    <div className="container">
      <h1>Password Reset </h1>
      <br></br>
      {message && <p className="success_p">{message}</p>}
      {error && <p className="error_p">!! {error}</p>}
      <form onSubmit={handleReset}>
        <input
          name="email"
          placeholder="Email"
          ref={emailRef}
          required
        />
        <button onClick={handleReset}>
          Reset Password
        </button>
      </form>
      <div className="account-exist-div">
        Already have an account? <Link to="/login" className="account-exist-link">Log in</Link>
      </div>
      <div className="create-account-div">
        Need an account? <Link to="/signup" className="create-account-link">Sign up</Link>
      </div>
    </div>
  );
}
