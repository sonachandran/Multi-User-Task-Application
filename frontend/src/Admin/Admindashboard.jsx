

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Admindashboard = () => {
  const [data, setdata] = useState([]);

  const viewalltask = async () => {
    const response = await axios.get('http://localhost:6500/findtask');
    if (response) {
      setdata(response.data);
    }
  };

  useEffect(() => {
    viewalltask();
  }, []);

  const completedTasks = data.filter((task) => task.status === 'Completed');
  const pendingTasks = data.filter((task) => task.status === 'Pending');
  const inProgressTasks = data.filter((task) => task.status === 'In-Progress');
  const totalTasks = data.length;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-3 sidebar2">
          <ul>
            <Link to='totaltask' className='no-text-decoration'><li><b>Total Task</b></li></Link>
            <Link to='completedtask' className='no-text-decoration'><li><b>Completed</b></li></Link>
            <Link to='inprogresstask' className='no-text-decoration'><li><b>In Progress</b></li></Link>
            <Link to='pendingtask' className='no-text-decoration'><li><b>Pending</b></li></Link>
          </ul>
        </div>

        <div className="col-12 col-md-9" style={{ marginTop: '150px' }}>
          <h2>Welcome To Dashboard</h2>
          <div className="d-flex flex-wrap justify-content-start" style={{ marginTop: "38px", gap: '30px' }}>
            <Link to='totaltask' className='no-text-decoration'>
              <div className="taskbox2 tasktext2">
                <strong>Total Task</strong>
                <p><b className='taskcount'>{totalTasks}</b></p>
              </div>
            </Link>

            <Link to='completedtask' className='no-text-decoration'>
              <div className="taskbox2 tasktext2">
                <strong>Completed</strong>
                <p><b className='taskcount'>{completedTasks.length}</b></p>
              </div>
            </Link>

            <Link to='inprogresstask' className='no-text-decoration'>
              <div className="taskbox2 tasktext2">
                <strong>In Progress</strong>
                <p><b className='taskcount'>{inProgressTasks.length}</b></p>
              </div>
            </Link>

            <Link to='pendingtask' className='no-text-decoration'>
              <div className="taskbox2 tasktext2">
                <strong>Pending</strong>
                <p><b className='taskcount'>{pendingTasks.length}</b></p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
