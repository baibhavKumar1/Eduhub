import { Button, Modal, Input } from "antd"
import Topbar from "./Topbar"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Sidebar from "./Sidebar";
import { GET_COURSES } from "../../utils/query";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COURSE } from "../../utils/mutations";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

const Course = () => {
  const {data,refetch} = useQuery(GET_COURSES)
  const [courses,setCourses]=useState([])
  useEffect(()=>{
       setCourses(data?.getAllCourses)
  },[data?.getAllCourses])
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  }; 
  let dataSet;
  if(data?.getAllCourses && courses?.length>0){
    dataSet = courses.map(({ title, users }) => ({
    title,
    Students: users.length
  })).sort((a, b) => b.Students - a.Students);
  }
  
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
    <div className="h-max flex flex-col dark:bg-black dark:text-white">
      <Topbar />
      <div className="flex-1 flex *:p-2">
        <Sidebar />
          <div className="flex-1 flex flex-col ">
            <div className="flex justify-between ">
              <p className="text-2xl">Courses: </p>
              <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={showModal} >Create Course</button>
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
            <div className="h-56 my-2 border dark:border-white border-black p-1 rounded h-max">
              <p>Trending Courses</p>
              <div>
              <LineChart width={600} height={200} style={{width:"500px"}} data={dataSet}
              className="m-auto w-full">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip className="dark:text-black"/>
              <Legend  className="dark:text-black"/>
              <Line type="monotone" dataKey="Students" stroke="#8884d8" />
            </LineChart>
              </div>
            </div>
            <div className="flex flex-wrap gap-8 *:w-[200px] *:h-[200px] *:border *:text-center justify-center p-4 *:flex *:justify-center *:flex-col *:rounded *:dark:border-white *:border-black">
              {data?.getAllCourses && data?.getAllCourses.map((item)=>{return(
                <div className="border cursor-pointer" onClick={() => navigate(`/course/${item.id}`)} key={item.id}>
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