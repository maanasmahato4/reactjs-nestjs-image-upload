import { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { ISignUpAuth } from '../Interface';
import { AuthContext } from '../context/AuthContext';
import { useAuthApi } from '../api/Auth.api';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const { signup } = useAuthApi();
  const { setToken, setDecodedToken, token } = useContext(AuthContext);

  const navigate = useNavigate();

  const [regData, setRegData] = useState<ISignUpAuth>({username: "" ,email: "", password: "", confirm_password: "" });
  const [showAlert, setShowAlert] = useState<Boolean>(false);


  useEffect(() => {
    if(token){
      navigate("/")
    }
  },[])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegData({ ...regData, [event.target.name]: event.target.value })
  }



  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (regData.password === regData.confirm_password) {
      const res = await signup({username: regData.username, email: regData.email, password: regData.password });
      setToken(res.access_token);
      const decoded_token = jwtDecode(res.access_token);
      setDecodedToken(decoded_token);
      navigate("/");
    }
    else {
      setShowAlert(true);
    }
  }
  return (
    <div style={{ padding: "1rem" }}>
      {showAlert && (
        <Alert key={'warning'} variant={'warning'}>
          Invalid Credentials!
        </Alert>
      )}
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
      <Form style={{ width: "40%", marginInline: "30%" }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='username' name="username" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ConfirmFormBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="confirm_password" onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default SignUp;