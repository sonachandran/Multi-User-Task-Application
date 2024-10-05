// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Navbar, Nav } from 'react-bootstrap';
// import { Link, useNavigate, useParams } from 'react-router-dom';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const userid = localStorage.getItem('id')
//   const [data, setData] = useState('')
//   const [viewtask, setviewtask] = useState('')

//   const logout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const submitData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:6500/viewprofile/${userid}`);
//       console.log("viewprofile", response.data);
//       setData(response.data)

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     submitData();
//   }, []);

//   //view task in dashboard

//   const ViewAllTask = async () => {
//     try {
//       const response = await axios.get(`http://localhost:6500/viewtask/${userid}`);
//       console.log("viewtasks :", response);
//       if (response.data) {
//         setviewtask(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   useEffect(() => {
//     ViewAllTask()
//   }, [])
//   console.log("viewtask", viewtask);


//   return (
//     <div className="dashboard-container">
//       <div className="row">
//         <div className="col sidebar  ">
//           <ul>
//             <li className='name '>{data.username}</li>
//             <li><Link to='addtask' className="no-text-decoration"><b >Add Task</b></Link></li>
//             <li><Link to={`alltask/${userid}`} className="no-text-decoration"><b style={{ textDecoration: "none" }}>All Your Task</b></Link></li>
//             <li><Link to='completed' className="no-text-decoration"><b >Completed</b></Link></li>
//             <li><Link to='pending' className="no-text-decoration"><b >Pending</b></Link></li>
//             <li><Link to='inprogress' className="no-text-decoration"><b >In-progress</b></Link></li>



//             <li><b>Projects</b></li>
//           </ul>
//         </div>



//         <div className="col  "  style={{ marginTop: '150px' }}  >
//           <h2 className=''>Welcome to the Dashboard</h2>

//           {Array.isArray(viewtask) && (
//             <div className="flex" style={{ gap: '30px',marginTop:'60px' }}>

//           <Link to='completed' className='no-text-decoration' >
//            <div className='taskbox tasktext bg1' >
//                 <p className='archivo-black-regular'>Completed</p>
//                 <p>{viewtask.filter(task => task.status?.toLowerCase() === 'completed').length}</p>
//             </div></Link>  
               
//                {/* ?.is called optional chaining,used to access properties on object without any error */}

//                <Link to='pending' className='no-text-decoration' > 
//                 <div className='taskbox tasktext bg2'>
//                  <p className='archivo-black-regular'>Pending</p>
//                  <p>{viewtask.filter(task => task.status?.toLowerCase() === 'pending').length}</p>
//                </div></Link>

//               <Link to='inprogress' className='no-text-decoration' > 
//                <div className='taskbox tasktext bg3'>
//                 <p className='archivo-black-regular'>In Progress</p>
//                 <p>{viewtask.filter(task => task.status?.toLowerCase() === 'in-progress').length}</p>
//               </div></Link>

//             </div>
//           )}
//         </div>




//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem('id');
  const [data, setData] = useState('');
  const [viewtask, setviewtask] = useState('');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const submitData = async () => {
    try {
      const response = await axios.get(`http://localhost:6500/viewprofile/${userid}`);
      console.log("viewprofile", response.data);
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    submitData();
  }, []);

  const ViewAllTask = async () => {
    try {
      const response = await axios.get(`http://localhost:6500/viewtask/${userid}`);
      console.log("viewtasks :", response);
      if (response.data) {
        setviewtask(response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    ViewAllTask();
  }, []);
  
  console.log("viewtask", viewtask);

  return (
    <div className=" container-fluid" >
      <div className="row">
        <div className=" col-12 col-md-3 sidebar">
          <ul>
            <li className='name'>{data.fullname}</li>
            <li><Link to='addtask' className="no-text-decoration"><b>Add Task</b></Link></li>
            <li><Link to={`alltask/${userid}`} className="no-text-decoration"><b>All Your Task</b></Link></li>
            <li><Link to='completed' className="no-text-decoration"><b>Completed</b></Link></li>
            <li><Link to='pending' className="no-text-decoration"><b>Pending</b></Link></li>
            <li><Link to='inprogress' className="no-text-decoration"><b>In-progress</b></Link></li>
            <li><Link to='sharedtask' className="no-text-decoration"><b>SharedTask</b></Link></li>
            <li><Link to='drag' className="no-text-decoration"><b>DragTask</b></Link></li>


          </ul>
        </div>

        <div className="col-12 col-md-9 " style={{ marginTop: '150px', marginLeft:"380px" }}>
          <h2>Welcome to the Dashboard</h2>

          {Array.isArray(viewtask) && (
            <div className=" d-flex  justify-content-start" style={{ gap: '30px', marginTop: '60px' }}>
              <Link to='completed' className='no-text-decoration'>
                <div className='taskbox tasktext bg1'>
                  <p className='archivo-black-regular'>Completed</p>
                  <p>{viewtask.filter(task => task.status?.toLowerCase() === 'completed').length}</p>
                </div>
              </Link>

              <Link to='pending' className='no-text-decoration'>
                <div className='taskbox tasktext bg2'>
                  <p className='archivo-black-regular'>Pending</p>
                  <p>{viewtask.filter(task => task.status?.toLowerCase() === 'pending').length}</p>
                </div>
              </Link>

              <Link to='inprogress' className='no-text-decoration'>
                <div className='taskbox tasktext bg3'>
                  <p className='archivo-black-regular'>In Progress</p>
                  <p>{viewtask.filter(task => task.status?.toLowerCase() === 'in-progress').length}</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


