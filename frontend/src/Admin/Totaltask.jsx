import axios from 'axios'
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Totaltask = () => {
    const [data, setdata] = useState([])
    const [refresh, setrefresh] = useState(false)
    const [searchitem, setsearchitem] = useState(''); // State for search input


    
const fetchtask=(event)=>{
    setsearchitem(event.target.value)
}

    const viewalltask = async () => {
        const response = await axios.get('http://localhost:6500/findtask')
        if (response) {
            setdata(response.data)
        }
    }
    console.log("viewwalltask", data);


    useEffect(() => {
        viewalltask()
    }, [refresh])


    const Deletetask = async (id) => {
        await axios.delete(`http://localhost:6500/deletetask/${id}`);
        setrefresh(!refresh);
    };

     const filtertask=data.filter((task)=>task.duedate.includes(searchitem))
     console.log(filtertask,"filtertask");
     



    return (


        <div>
            <div className='flex justify-content-end me-5'>
                <input
                    type="text"
                    placeholder="Search by title"
                    style={{ marginTop: '130px', marginRight: '10px', width: '300px' }}
                    onChange={fetchtask}
                />
            </div>
            <div style={{ marginTop: '10px', padding: '20px' }}>
                <h4 className='text-center' style={{ fontFamily: 'serif' }}><b>All Your Tasks</b></h4>
                <Table className='mt-4 table ms-5 me-4'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtertask.length > 0 ? (
                            filtertask.map((task) => (
                                <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td><b className='due'>{new Date(task.duedate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}</b></td>                                    <td>{task.status}</td>
                                    <td className='text-center'>
                                        <Link to={`/adminnav/editalltask/${task._id}`}><Button style={{ marginRight: '10px', width: '110px', height: '40px' }} >
                                            Edit
                                        </Button></Link>

                                        <Button
                                            onClick={() => Deletetask(task._id)}
                                            style={{ width: '110px', height: '40px', backgroundColor: 'red' }}

                                        >
                                            Delete
                                        </Button>
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
            </div>

            )
}

            export default Totaltask