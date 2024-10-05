import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    email: '',
    role: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const fetchData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });

    // Password validation logic
    if (event.target.name === 'password') {
      if (event.target.value.length < 6 ) {
        setPasswordError('Password must be at least 6 characters long');
      } else {
        setPasswordError(''); // Clear error if password is valid
      }
    }
  }

  const submitData = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!data.fullname || !data.password || !data.email || !data.role) {
      toast.error("Please fill out all fields");
      return;
    }

 

    try {
      const response = await axios.post('http://localhost:6500/adduser', data);
      console.log("User registered successfully:", response.data);

      if (response.data) {
        toast.success("User Registered Successfully");
      } else {
        toast.error("Error registering user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Error occurred while registering the user. Please try again.");
    }
  };

  return (
    <div  style={{marginTop:'120px'}}>
      <h2 className='flex' style={{ fontFamily: "serif", color: "rgb(120, 210, 127)" }}>Register</h2>
      <div className='flex mt-3'>
        <div className='box '>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Email:</Form.Label>
              <Form.Control 
                name='email' 
                placeholder="Enter Email" 
                onChange={fetchData} 
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control 
                name='password' 
                placeholder="Enter Password" 
                type="password"
                onChange={fetchData} 
              />
              {/* Display password validation error only when the password is less than 6 characters */}
              {passwordError && (
                <Form.Text className="text-danger">
                  {passwordError}
                </Form.Text>
              )}
             
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Fullname</Form.Label>
              <Form.Control 
                placeholder="Enter fullname" 
                name='fullname' 
                onChange={fetchData} 
              />
              
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Role:</Form.Label>
              <Form.Select defaultValue="Choose..." name='role' onChange={fetchData}>
                <option value="choose"></option>
                <option>Admin</option>
                <option>User</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <button className='btn' onClick={submitData}>Submit</button>
          </Form>
        </div>
      </div>
      <ToastContainer 
      theme='colored'
      />
    </div>
  )
}

export default Registration;
