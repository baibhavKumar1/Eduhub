import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Admin/Dashboard";
import {Dashboard as StudentDashboard} from "../Pages/Student/Dashboard";
import {Lecture as StudentLecture} from "../Pages/Student/Lecture";
import Course from "../Pages/Admin/Course";
import Lecture from "../Pages/Admin/Lecture";
import SingleLecture from "../Pages/Student/SingleLecture";
import SingleAssignment from "../Pages/Student/SingleAssignment";

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path="/" element={<Register/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/course' element={<Course/>}/>
            <Route path='/lecture' element={<Lecture/>}/>
            <Route path='/sdashboard' element={<StudentDashboard/>}/>
            <Route path="/slecture" element={<StudentLecture/>}/>
            <Route path="/lecture/:id" element={<SingleLecture/>}/>
            <Route path="/assignment/:id" element={<SingleAssignment/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes