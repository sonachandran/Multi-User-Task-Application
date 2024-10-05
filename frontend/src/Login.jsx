import axios from 'axios';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate()
  const [data, setData] = useState({ email: '', password: '' });
  const fetchdata = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitdata = async (event) => {
    event.preventDefault(); 
    try {
      const response = await axios.post("http://localhost:6500/login", data);
      console.log("login data", response);
      const  token=response.data.token
      console.log("token",token);
      localStorage.setItem("token",token) //2
      localStorage.setItem("id",response.data.user._id)

      if (response.data) {
        if(response.data.user.role==='User') 
        {
          toast.success("login succes")
          navigate('/usernav')
        }
        else{
          navigate('/adminnav')

        }
       
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      
      toast.error("Invalid Email Or Password");
    }
  };

  return (
    <div style={{marginTop:'150px'}}>
      <h2 className='flex mt-3' style={{ color: "rgb(120, 210, 127)", fontFamily: 'serif' }}>Login</h2>
      <div className='flex mt-3'>
        <div className='box'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" name='email' onChange={fetchdata} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control name='password' placeholder="Enter Password" type="password" onChange={fetchdata} />
              <Form.Text className="text-muted">
                We'll never share your password with anyone else.
              </Form.Text>
            </Form.Group>

            <button className='btn' onClick={submitdata}>Submit</button>
            
          </Form>
        </div>
      </div>
      
      <ToastContainer
      theme='colored'
       />
    </div>
  );
};

export default Login;
