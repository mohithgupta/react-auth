import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/Authcontext";
import { Link,useHistory } from "react-router-dom";

function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory()


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/")
    } catch {
      setError("Check your Email/Password");
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <h1>Login to your Account </h1>
      <br></br>
      {error && <p className="error_p">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
        />
        <input
          name="pwd"
          placeholder="Password"
          type="password"
          ref={passwordRef}
          required
        />
        <button disabled={loading} onClick={handleSubmit}>
          Login
        </button>
      </form>
      <div className="forgot-password-div">
       <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
      </div>
      <div className="create-account-div">
        Need an account? <Link to="/signup" className="create-account-link">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
