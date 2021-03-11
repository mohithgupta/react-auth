import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/Authcontext";
import { Link ,useHistory} from "react-router-dom";

export default function UpdateProfile() {
  
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser,updateEmail,updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
        return setError("The Passwords do not match !!")
    }
     
    const promises = []
    setLoading(true)
    setError("")

    if(emailRef.current.value !== currentUser.email){
        promises.push(updateEmail(emailRef.current.value))
    }
    if(passwordRef.current.value.length<6){
      setError("Password must be min 6 characters long!!")
      setLoading(false)
    }
    else{
       if(passwordRef.current.value){
        promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(()=>{
        setMessage("Successfully Updated Credentials. You will be Redirected to the Dashboard.")
            const timer = setTimeout(() => {
              history.push("/")
            }, 2000);
            return () => clearTimeout(timer);
    }).catch(()=>{
        setError("Failed to update credentials.")
    }).finally(()=>{
        setLoading(false)
    })
  }

  }

  return (
    <div className="container">
      <h1>Update Profile</h1>
      <br></br>
      {message && <p className="success_p">{message}</p>}
      {error && <p className="error_p">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          ref={emailRef}
          defaultValue={currentUser.email}
          required
        />
        <p className="label"> New Password :</p>
        <input
          placeholder="Leave Blank to keep it same"
          type="password"
          ref={passwordRef}
        />
        <p className="label"> Retype New Password : </p>
        <input
          type="password"
          placeholder="Leave Blank to keep it same"
          ref={passwordConfirmRef}
        />
        <button disabled={loading} type="submit" onClick={handleSubmit}>
          Update
        </button>
      </form>
      <br></br>
      <div className="account-exist-div">
          <Link to="/" className="update-button"> Cancel</Link>
      </div>
    </div>
  );
}

