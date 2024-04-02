import { Button, Modal, Input } from "antd"
import Topbar from "./Topbar"
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Sidebar from "./Sidebar";
import { GET_COURSES } from "../../utils/query";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COURSE } from "../../utils/mutations";

const Course = () => {
  const {data,refetch} = useQuery(GET_COURSES)
  console.log(data?.getAllCourses);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const [course,setCourse] = useState({
    title:"",
    duration:"",
    description:""
  })
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const [createCourse] = useMutation(CREATE_COURSE,{onCompleted:()=>refetch()})
  const handleSubmit = async()=>{
    try{
      const res = await createCourse({
        variables:{...course}
      })
      if(res.data){
        console.log(res.data);
      }
    }catch(err){
      console.log(err.message);
    }
    setCourse({title:"",duration:"",description:""})
    setOpen(false)
  }
  return (
    <div className="h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 flex *:p-2">
        <Sidebar />
          <div className="flex-1 flex flex-col ">
            <div className="flex justify-between ">
              <p className="text-2xl">Courses: </p>
              <Button onClick={showModal}>Create Course</Button>
              <Modal open={open} title="Create Course"
                onOk={handleOk} onCancel={handleCancel}
                footer={(_, { CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <Button onClick={handleSubmit}>Add</Button>
                  </>)}>
                <div className="flex flex-col gap-4">
                  <Input type="text" placeholder="Title" value={course.title} onChange={(e)=>{setCourse({...course,title:e.target.value})}}/>
                  <Input type="text" placeholder="Description" value={course.description} onChange={(e)=>{setCourse({...course,description:e.target.value})}}/>
                  <Input type="text" placeholder="Duration" value={course.duration} onChange={(e)=>{setCourse({...course,duration:e.target.value})}}/>
                </div>
              </Modal>
            </div>
            <div className="h-56 my-2 border p-1 rounded">
              <p>Trending Courses</p>
              <div></div>
            </div>
            <div className="flex flex-wrap gap-8 *:w-[200px] *:h-[200px] *:border *:text-center justify-center p-4 *:flex *:justify-center *:flex-col *:rounded">
              {data?.getAllCourses && data?.getAllCourses.map((item)=>{return(
                <div className="border " onClick={() => navigate(`/course/${item.id}`)} key={item.id}>
                <p>{item.title}</p>
                <p>This is the first batch of MERN stack development</p>
                <p>Students: {item.users.length}</p>
                <p>Lectures: {item.lectures.length}</p>
              </div>
              )})}
            </div>
          </div>
        
      </div>
    </div>
  )
}

export default Course