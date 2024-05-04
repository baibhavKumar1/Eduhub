import Topbar from "./Topbar"
import Sidebar from "./Sidebar"
import { useState } from "react";
import { Button, Modal, Input } from "antd"
import { useQuery } from "@apollo/client";
import { GET_STUDENTS_TASK } from "../../utils/query";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis,Tooltip } from "recharts";
const Students = () => {
  const [open, setOpen] = useState(false);
  const {loading,data} = useQuery(GET_STUDENTS_TASK)
  const dataSet = !loading && data?.getStudentsTasks?.filter((item)=>item.role === "Student").map((item)=>(
      {
        id:item.id,
        Name:item.username.toUpperCase(),
        Assignments:item.completedAssignments.length,
        Lectures:item.completedLectures.length,
        Role:item.role
      }
    ))
 
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className="h-max flex flex-col dark:bg-black dark:text-white">
        <Topbar/>
        <div className="flex flex-1 *:p-2">
            <Sidebar/>
            <div className="flex-1 flex flex-col ">
            <div className="flex justify-between ">
              <p className="text-2xl">Students: </p>
              <Button onClick={showModal}>Add Student</Button>
              <Modal open={open} title="Add Student"
                onOk={handleOk} onCancel={handleCancel}
                footer={(_, { CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <Button>Add</Button>
                  </>)}>
                <div className="flex flex-col gap-4">
                  <Input type="text" placeholder="Title" />
                  <Input type="text" placeholder="Description" />
                  <Input type="text" placeholder="Duration" />
                </div>
              </Modal>
            </div>
            <div className="h-56 my-2 border dark:border-white border-black p-1 rounded">
              <p>Trending Students</p>
              <div>
              <LineChart width={600} height={200} style={{width:"500px"}} data={!loading && dataSet?.sort((a,b)=>a.Lectures-b.Lectures)}
              className="m-auto w-full">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Lectures" stroke="#8884d8" />
              <Line type="monotone" dataKey="Assignments" stroke="#82ca9d" />
            </LineChart>
              </div>
            </div>
            <div className="flex flex-wrap gap-8 *:w-[200px] *:h-[200px] *:border *:text-center justify-center p-4 *:flex *:justify-center *:flex-col *:rounded *:dark:border-white *:border-black">
              {!loading && dataSet.map((item)=>{
              return(<div key={item.id}>
                <p>{item.Name.toUpperCase()}</p>
              </div>)})}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Students