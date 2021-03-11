import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/Authcontext";
import { Link ,useHistory} from "react-router-dom";

function Signup() {
  
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault();

      if(passwordRef.current.value.length<6){
        return setError("Password should be minimum 6 characters long!!")
      }
      try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      history.push("/")
    } catch {
      setError("!! Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <h1>Create an Account</h1>
      <br></br>
      {/* {currentUser && currentUser.email} */}
      {error && <p className="error_p">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
        />
        <input
          placeholder="Password"
          type="password"
          ref={passwordRef}
          required
        />
        <button disabled={loading} type="submit" onClick={handleSubmit}>
          Signup
        </button>
      </form>
      <div className="account-exist-div">
        Already have an account? <Link to="/login" className="account-exist-link">Log in</Link>
      </div>
    </div>
  );
}

export default Signup;
