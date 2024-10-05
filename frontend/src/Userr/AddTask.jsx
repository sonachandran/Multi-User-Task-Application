
import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';

const AddTask = () => {
    const userId=localStorage.getItem('id')
    const [data, setData] = useState({
        userId,          
        title: '',
        description: '',
        duedate: '',
        status: ''
    });

    const fetchData = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submitData = async () => {
        try {
            const response = await axios.post("http://localhost:6500/addtask", data);
            console.log("Task added:", response.data);
            toast.success("Task Added Successfully");
        } catch (error) {
            console.error("Error adding task:", error);
            toast.error("Error adding task"); 
        }
    };

    return (
        <div style={{ marginTop: '120px' }}>
            <h2 className='flex' style={{ fontFamily: "serif", color: "rgb(120, 210, 127)" }}>Add Task</h2>
            <div className='flex mt-3'>
                <div className='box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label> Title:</Form.Label>
                            <Form.Control
                                name='title'
                                onChange={fetchData}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                name='description'
                                onChange={fetchData}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>DueDate</Form.Label>
                            <Form.Control
                                type='date'
                                name='duedate'
                                onChange={fetchData}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicRole">
                            <Form.Label>Status:</Form.Label>
                            <Form.Select defaultValue="Choose..." name='status' onChange={fetchData}>
                                <option value="">Choose...</option>
                                <option value="Pending">Pending</option>
                                <option value="In-Progress">In-Progress</option>
                                <option value="Completed">Completed</option>
                            </Form.Select>
                        </Form.Group>

                        <button 
                            className='btn' 
                            onClick={(event) => {
                                event.preventDefault(); 
                                submitData();
                            }}
                        >
                            Submit
                        </button>
                    </Form>
                </div>
            </div>
            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                hideProgressBar={false} 
                closeOnClick 
                pauseOnHover 
                draggable 
                theme="colored" 
            />
        </div>
    );
};

export default AddTask;



