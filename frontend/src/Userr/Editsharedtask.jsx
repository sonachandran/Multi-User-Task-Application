import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Editsharedtask = () => {
    const { id } = useParams(); 
    const [data, setData] = useState({
        title: '',
        description: '',
        duedate: '',
        status: ''
    });

    console.log("id", id);

    const fetchData = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    console.log("Updated Data", data);

    const submitData = async () => {
        try {
            const response = await axios.put(`http://localhost:6500/updatetask/${id}`, data);

            if (response.data ) {
                toast.success("Task updated successfully!");
            } else {
                toast.error("Error updating task!");
            }
        } catch (error) {
            toast.error("Server error: Unable to update task.");
            console.error("Error updating task:", error);
        }
    };

    return (
        <div style={{ marginTop: '120px' }}>
            <h2 className='flex' style={{ fontFamily: "serif", color: "rgb(120, 210, 127)" }}>
                Update Task
            </h2>
            <div className='flex mt-3'>
                <div className='box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                name='title'
                                value={data.title}
                                onChange={fetchData}
                                placeholder="Enter Task Title"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                name='description'
                                value={data.description}
                                onChange={fetchData}
                                placeholder="Enter Task Description"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDueDate">
                            <Form.Label>Due Date:</Form.Label>
                            <Form.Control
                                type='date'
                                name='duedate'
                                value={data.duedate}
                                onChange={fetchData}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicStatus">
                            <Form.Label>Status:</Form.Label>
                            <Form.Select
                                defaultValue="Choose..."
                                name='status'
                                value={data.status}
                                onChange={fetchData}
                            >
                                <option value="">Choose...</option>
                                <option value="Pending">Pending</option>
                                <option value="In-Progress">In-Progress</option>
                                <option value="Completed">Completed</option>
                            </Form.Select>
                        </Form.Group>

                        <button
                            className='btn'
                            type="button"
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

export default Editsharedtask;
