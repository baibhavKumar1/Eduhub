import Topbar from "./Topbar"
import Sidebar from "./Sidebar"
import { useEffect, useState } from "react";
import { Button, Modal, Input } from "antd"
import { useMutation, useQuery } from "@apollo/client";
import { GET_EDUCATORS_TASK } from "../../utils/query";
import { CREATE_USER } from "../../utils/mutations";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
const Educators = () => {
  const [open, setOpen] = useState(false);
  const {loading,data,refetch} = useQuery(GET_EDUCATORS_TASK);
  const [createUser] = useMutation(CREATE_USER,{onCompleted:()=>refetch()})
  const [task,setTask]= useState({});
  useEffect(()=>{
    if(!loading)
    setTask(data?.getEducatorsTasks)
  },[data,loading])
  const dataSet = task?.user?.map(user => {
    const { id, username } = user;
    const lectures = task?.allLectures?.filter(lecture => lecture.educator === id);
    const assignments = task?.allAssignments?.filter(assignment => assignment.educator === id);
    const lectureCount = lectures.length;
    const assignmentCount = assignments.length;
    return {
      id,
      name:username.toUpperCase(),
      Lectures:lectureCount,
      Assignments:assignmentCount
    };
  })
  const [user,setUser] = useState({
    username:"",
    email:"",
    password:""
  })
  const handleSubmit = async()=>{
    try{
      const res = await createUser({
        variables:{...user}
      })
      if(res.data){
        console.log(res.data);
      }
    }catch(err){
      console.log(err.message);
    }
    setUser({email:"",username:"",password:""})
    setOpen(false)
  }
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  // const dataSet = data?.getEducatorsTasks
  return (
    <div className="h-screen flex flex-col dark:bg-black dark:text-white">
        <Topbar/>
        <div className="flex flex-1 *:p-2">
            <Sidebar/>
            <div className="flex-1 flex flex-col ">
            <div className="flex justify-between ">
              <p className="text-2xl">Educators: </p>
              <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={showModal} >Add Educator</button>
              <Modal open={open} title="Add Educator"
                onOk={handleOk} onCancel={handleCancel}
                footer={(_, { CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <Button onClick={handleSubmit}>Add</Button>
                  </>)}>
                <div className="flex flex-col gap-4 ">
                <Input type="text" placeholder="Username" value={user.username} onChange={(e)=>{setUser({...user,username:e.target.value})}}/>
                  <Input type="email" placeholder="Email" value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}}/>
                  <Input type="password" placeholder="Password" value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}}/>
                </div>
              </Modal>
            </div>
            
            <div className="h-56 my-2 border p-1 rounded">
              <p>Trending Educators</p>
              <div>
              <LineChart width={600} height={200} style={{width:"500px"}} data={dataSet?.sort((a,b)=>a.Lectures-b.Lectures)}
              className="m-auto w-full">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Lectures" stroke="#8884d8" />
              <Line type="monotone" dataKey="Assignments" stroke="#82ca9d" />
            </LineChart>
              </div>
            </div>
            <div className="flex flex-wrap gap-8 *:w-[200px] *:h-[200px] *:border *:text-center justify-center p-4 *:flex *:justify-center *:flex-col *:rounded *:border-black *:dark:border-white *:cursor-default">
              {!loading && data?.getEducatorsTasks.user?.map((item)=>{
                return(
                  <div className="border " key={item.id}>
                <p>{item.username.toUpperCase()}</p>
                
              </div>
              )})}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Educators