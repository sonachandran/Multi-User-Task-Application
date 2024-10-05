import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import './User.css'
import Registration from './Registration'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Login';
import Dashboard from './Userr/Dashboard';
import Usernav from './Userr/Usernav';
import AddTask from './Userr/AddTask';
import AllTask from './Userr/AllTask';
import Completed from './Userr/Completed';
import Pending from './Userr/Pending';
import Inprogress from './Userr/Inprogress';
import Edittask from './Userr/Edittask';
import Adminnav from './Admin/Adminnav';
import Admindashboard from './Admin/Admindashboard';
import Totaltask from './Admin/Totaltask';
import Completedtask from './Admin/Completedtask';
import Inprogresstask from './Admin/Inprogresstask';
import Pendingtask from './Admin/Pendingtask';
import Sharedtask from './Userr/Sharedtask';
import Editalltask from './Admin/Editalltask';
import Editsharedtask from './Userr/Editsharedtask';
import Drag from './Userr/Drag';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
   <Routes>
    <Route>
      <Route path='/' element={<Home/>}>
      <Route index element={<App/>}/>
      <Route path="registration" element={<Registration/>}/>
      <Route path="login" element={<Login/>}/>
      </Route>
    </Route>

     
    <Route path="/usernav/*" element={<Usernav />}>
          <Route index element={<Dashboard/>}/>
          <Route path='addtask' element={<AddTask/>}/>
          <Route path='alltask/:id' element={<AllTask/>}/>
          <Route path='completed' element={<Completed/>}/>
          <Route path='pending' element={<Pending/>}/>
          <Route path='inprogress' element={<Inprogress/>}/>
          <Route path='edittask/:id' element={<Edittask/>}/>
          <Route path='sharedtask' element={<Sharedtask/>}/>
          <Route path='editsharedtask/:id' element={<Editsharedtask/>}/>
          <Route path='drag' element={<Drag/>}/>



     
    </Route>

    <Route path="/adminnav/*" element={<Adminnav />}>
           <Route index element={<Admindashboard/>}/>
           <Route path='totaltask' element={<Totaltask/>}/>
           <Route path='totaltask' element={<Totaltask/>}/>
           <Route path='completedtask' element={<Completedtask/>}/>
           <Route path='pendingtask' element={<Pendingtask/>}/>
           <Route path='inprogresstask' element={<Inprogresstask/>}/>
           <Route path='editalltask/:id' element={<Editalltask/>}/>





         
     
    </Route>
           
     

   </Routes>
   </BrowserRouter>
  </React.StrictMode>




);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

