import { Route, Routes } from "react-router-dom";
import {Login} from "../Pages/Login";
import Register from "../Pages/Register";
import { Course,Students,Educators,Lectures,Dashboard,CourseLecture } from "../Pages/Admin";
import { EducatorDashboard, EducatorLecture, EducatorSingleLecture, EducatorStudents } from "../Pages/Educator";
import Trial from "../Pages/Trial";
import Profile from "../Pages/Student/Profile";
import { StudentDashboard, StudentLecture, StudentSingleAssignment, StudentSingleLecture } from "../Pages/Student";

const AllRoutes = () => {
  return (
    <div>
        <Routes>        
            <Route path='/login' element={<Login/>}/>
            <Route path="/" element={<Register/>}/>
            {/* Admin Routes */}
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/courses' element={<Course/>}/>
            <Route path='/lectures' element={<Lectures/>}/>
            <Route path='/educators' element={<Educators/>}/>
            <Route path='/students' element={<Students/>}/>
            <Route path='/:type/:id' element={<CourseLecture/>}/>
            {/* Educator Routes */}
            <Route path="/edashboard" element={<EducatorDashboard/>}/>
            <Route path="/electure" element={<EducatorLecture/>}/>
            <Route path="/electure/:id" element={<EducatorSingleLecture/>}/>
            <Route path="/estudent" element={<EducatorStudents/>}/>
            
            {/* Students Routes */}
            <Route path='/sdashboard' element={<StudentDashboard/>}/>
            <Route path="/slecture" element={<StudentLecture/>}/>
            <Route path="/slecture/:id" element={<StudentSingleLecture/>}/>
            <Route path="/sassignment/:id" element={<StudentSingleAssignment/>}/>
            <Route path="/trial" element={<Trial/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes