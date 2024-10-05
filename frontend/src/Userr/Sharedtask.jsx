import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Edittask from './Edittask';
import { Link } from 'react-router-dom';



const Sharedtask = () => {
    const[refresh,setrefresh]=useState(false)
    const [sharedTasks, setSharedTasks] = useState([]);
    const userId = localStorage.getItem('id'); 

    useEffect(() => {
        const fetchSharedTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:6500/tasks/shared/${userId}`);
                setSharedTasks(response.data);
            } catch (error) {
                console.error("Error fetching shared tasks:", error);
            }
        };

        fetchSharedTasks();
    }, [userId],refresh);
    console.log("ddj", sharedTasks);

    const editTask=async()=>{

    }

    const deleteTask=async(taskId)=>{
        await axios.delete(`http://localhost:6500/deletetask/${taskId}`);
        setrefresh(!refresh);
    }
    


    return (


        <div style={{ marginTop: '90px', padding: '20px' }}>
        <h4 className='text-center mt-5' style={{ fontFamily: 'serif' }}><b>Shared Tasks</b></h4>
        
        {sharedTasks.length > 0 ? (
            <div className="flex mt-4" style={{gap:'30px'}}>
                {sharedTasks.map((task) => (
                    <div className=" text-center" >
                    <div className="stask bg4 " key={task._id}>
                            <h5 >{task.title}</h5>
                            <p >{task.description}</p>
                            <p><strong>Due Date:</strong> {new Date(task.duedate).toLocaleDateString()}</p>
                            <p><strong>Status:</strong> {task.status}</p>

                           <Link to={`/usernav/editsharedtask/${task._id}`}><button className="btn btn-danger" >
                            <MdEditNote />

                            </button></Link> 

                           
                            <button className="btn btn-danger" onClick={() => deleteTask(task._id)}>
                                <MdDelete/>
                            </button>



                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center">
                <p>No shared tasks found.</p>
            </div>
        )}
    </div>
    )
};

export default Sharedtask;



