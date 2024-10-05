import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

const Completedtask = () => {
    const[data,setdata]=useState([])

    const viewalltask=async()=>{
         const response=await axios.get('http://localhost:6500/findtask')
         if(response){
             setdata(response.data)
         }
    }
    console.log("viewwalltask",data);
    

    useEffect(()=>{
        viewalltask()
    },[])

    const completedtasks = data.filter((task) => task.status === 'Completed');
    console.log("completedtask",completedtasks);
    

  return (


    <div style={{ marginTop: '140px', padding: '20px' }}>
    <Table className=' table ms-5 me-4'>
        <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {completedtasks.length > 0 ? (
                completedtasks.map((task) => (
                    <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td><b className='due'>{new Date(task.duedate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        })}</b></td>
                        <td><b className='com'>{task.status}</b></td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="4" className="text-center">No tasks found for this user.</td>
                </tr>
            )}
        </tbody>
    </Table>
</div>
  )
}

export default Completedtask