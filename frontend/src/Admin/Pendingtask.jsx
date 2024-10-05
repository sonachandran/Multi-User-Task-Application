import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

const Pendingtask = () => {
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

    const  pendingtasks = data.filter((task) => task.status === 'Pending');
    console.log("pendingtasks",pendingtasks);
    

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
            {pendingtasks.length > 0 ? (
                pendingtasks.map((task) => (
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

export default Pendingtask