import React,{useState} from "react";
import {Card,Button,Alert,Container} from "react-bootstrap";
import {useAuth} from "../contexts/Authcontext"
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export default function Dashboard() {
  const [error,setError] = useState("")
  const {currentUser,logout} = useAuth();
  const history = useHistory()

  async function handleSubmit(){
    setError("")

    try{
      await logout()
      history.push("/login")
    }
    catch{
      setError("Failed to Log Out")
    }
  }


  return(
    <Container className="d-flex align-items-center justify-content-center">
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Profile</h1>
          <br></br>

          {error && <Alert variant="danger">!! {error}</Alert>}
          <strong>Email : </strong>{currentUser.email}
          <br></br>
          <br></br>

          <Link to="/update-profile" className="update-button">Update Profile</Link>
        </Card.Body>
      </Card>
      <br></br>

      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleSubmit}>Log Out</Button>
      </div>

    </>
    </Container>
  );
}
