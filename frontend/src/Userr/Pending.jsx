import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

const Pending = () => {
    const [data, setData] = useState([]);
    const id = localStorage.getItem('id');
    const[searchitem,setsearchitem]=useState('')

     const fetchtask=(event)=>{
     setsearchitem(event.target.value)
      }

    const ViewAllTask = async () => {
        try {
            const response = await axios.get(`http://localhost:6500/viewtask/${id}`);
            console.log("Response:", response);
            if (response.data) {
                setData(response.data);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        ViewAllTask();
    }, []);

    console.log("data", data);

    const pending = data.filter(task => task.status?.toLowerCase() === 'pending');
    
    const searchedtask=pending.filter(task=>task.title.includes(searchitem))
    console.log("searchedtask",searchedtask);
    

    return (
  <div>
        <div className='flex justify-content-end me-5'>
        <input
            type="text"
            placeholder="Search by title"
            style={{ marginTop: '130px', marginRight: '10px',width:'300px' }}
            onChange={fetchtask}
        />
    </div>
        <div style={{ marginTop: '10px', padding: '20px' }}>
            <Table className='mt-4 table ms-5 me-4'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {searchedtask.length > 0 ? (
                        searchedtask.map((task) => (
                            <tr key={task._id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td><b className='due'>{new Date(task.duedate).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}</b></td>
                                <td><b className='pend'>{task.status}</b></td>

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

        </div>

    )
}

export default Pending