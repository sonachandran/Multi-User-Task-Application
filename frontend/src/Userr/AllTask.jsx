


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const AllTask = () => {
    const [shareEmails, setShareEmails] = useState({});
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { id } = useParams();
    const userid=localStorage.getItem('id')
    const navigate = useNavigate();

    console.log("ID:", id);

    const ViewAllTask = async () => {
        try {
            const response = await axios.get(`http://localhost:6500/viewtask/${userid}`);
            console.log("Response:", response);
            if (response.data) {
                setData(response.data);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        if (id) {
            ViewAllTask();
        } else {
            console.error("No ID provided to fetch tasks.");
        }
    }, [refresh]);

    console.log("View all tasks:", data);

    const Deletetask = async (taskId) => {
        await axios.delete(`http://localhost:6500/deletetask/${taskId}`);
        setRefresh(!refresh);
    };

    const handleEmailChange = (taskId, event) => {
        setShareEmails({ ...shareEmails, [taskId]: event.target.value });
    };

    console.log("shareEmails",shareEmails);
    

    const shareTask = async (taskId) => {
        try {
            const response = await axios.post(`http://localhost:6500/tasks/${taskId}/share`, {
                email: shareEmails[taskId], 
                userId: id
            });
            console.log("Task shared:", response.data);
            // Clear the email input for this task
            setShareEmails({ ...shareEmails, [taskId]: '' });
        } catch (error) {
            console.error("Error sharing task:", error);
        }
    };

    return (
        <div style={{ marginTop: '100px', padding: '20px' }}>
            <h4 className='text-center' style={{ fontFamily: 'serif' }}><b>All Your Tasks</b></h4>
            <Table className='mt-4 table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                        <th>Share</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((task) => (
                            <tr key={task._id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td><b className='due'>{new Date(task.duedate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}</b></td>
                               <td>{task.status}</td>
                                <td className='text-center'>
                                    <Link to={`/usernav/edittask/${task._id}`}>
                                        <Button style={{ marginRight: '10px', width: '110px', height: '40px' }}>
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => Deletetask(task._id)}
                                        style={{ width: '110px', height: '40px', backgroundColor: 'red' }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder='Enter email'
                                        value={shareEmails[task._id] || ''} 
                                        onChange={(e) => handleEmailChange(task._id, e)} 
                                    />
                                </td>
                                <td>
                                    <Button onClick={() => shareTask(task._id)}>Share</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No tasks found for this user.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default AllTask;





































