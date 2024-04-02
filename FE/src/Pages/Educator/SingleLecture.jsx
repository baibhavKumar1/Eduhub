import { Button, Input, Modal } from 'antd'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import { GET_SINGLE_LECTURE } from '../../utils/query'
import {useParams} from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { CREATE_ASSIGNMENT } from '../../utils/mutations'
const SingleLecture = () => {
  const [open, setOpen] = useState(false);
  const {id} = useParams()
  const {data,refetch} = useQuery(GET_SINGLE_LECTURE,{
    variables: { id: id }
  })
  const [lecture,setLecture] = useState()
  useEffect(()=>{
    setLecture(data?.getSingleLecture)
  },[data])
  const handleCancel= ()=>{
    setOpen(false)
  }
  const [assignment,setAssignment] = useState({
    content:"",
    deadline:""
  })
  const [createAssignment] = useMutation(CREATE_ASSIGNMENT, {onCompleted:()=>refetch()})
  const handleSubmit = async()=>{
    console.log(lecture)
    try{
      const res = await createAssignment({
        variables:{...assignment,lecture:lecture.id}
      })
      if(res.data){
        console.log(res.data);
      }
    }catch(err){
      console.log(err.message);
    }
    setLecture({content:"",deadline:""})
    setOpen(false)
  }
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const suffixes = ['st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st'];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const formattedDay = `${day}${suffixes[day - 1]}`;
    const formattedDate = `${formattedDay} ${months[monthIndex]}, ${year}`;
    return formattedDate;
}
  return (
    <div className='h-screen flex flex-col'>
      <Topbar />
      <div className='flex flex-1 *:p-2'>
        <Sidebar />
        {lecture?.title && <div className='flex flex-1 flex-col space-y-4'>
          <div className='flex justify-between'>
            <div>
              <p className='text-2xl'>{lecture.title}</p>
              <p>{lecture.course.title}</p>
            </div>
            <Button onClick={()=>setOpen(true)}>Create Assignment</Button>
              <Modal open={open} title="Create Assignment"
                onCancel={handleCancel} 
                footer={(_, { CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <Button onClick={handleSubmit}>Add</Button>
                  </>)}>
                <div className="flex flex-col gap-4">
                  <Input type="text" placeholder="Task" value={assignment.content} onChange={(e)=>{setAssignment({...assignment,content:e.target.value})}}/>
                  <Input type="text" placeholder="Deadline" value={assignment.deadline} onChange={(e)=>{setAssignment({...assignment,deadline:e.target.value})}}/>
                </div>
              </Modal>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>{formatTimestamp(+lecture.createdAt)}</p>
          <div>
            <p>Assignments</p>
            {lecture?.assignment?.length>0 ?lecture.assignment.map((item)=>
            <div className='border my-2 p-1 border-black rounded' key={item.id}><p>{item.content}</p><p>Deadline: {item.deadline}</p></div>): <p>No Assignment Available</p>}
          </div>
          <div>
            <p>Discussions</p>
            {lecture?.discussion?.length>0 ?lecture.discussion.map((item)=>
            <div className='border my-2 p-1 border-black rounded' key={item.id}><p>{item.content}</p></div>): <p>No Discussion Available</p>}
          </div>
          
        </div>}
      </div>
    </div>
  )
}

export {SingleLecture}