import { Button, Input, Modal } from 'antd'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import { GET_SINGLE_LECTURE } from '../../utils/query'
import {useParams} from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { CREATE_ASSIGNMENT, CREATE_DISCUSSION, DELETE_DISCUSSION } from '../../utils/mutations'
const SingleLecture = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
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
    setOpen1(false)
  }
  const [assignment,setAssignment] = useState({
    content:"",
    deadline:""
  })
  const [discussion,setDiscussion] = useState({
    content:"",
  })
  const [createDiscussion] = useMutation(CREATE_DISCUSSION, { onCompleted: () => refetch() })
  const [deleteDiscussion] = useMutation(DELETE_DISCUSSION, { onCompleted: () => refetch() })
  const [createAssignment] = useMutation(CREATE_ASSIGNMENT, {onCompleted:()=>refetch()})
  const handleDiscussionCreation = async()=>{
    console.log(lecture)
    try{
      const res = await createDiscussion({
        variables:{content:discussion.content,id:lecture.id}
      })
      if(res.data){
        console.log(res.data);
      }
    }catch(err){
      console.log(err.message);
    }
    setDiscussion({content:""})
    setOpen1(false)
  }
  const handleDeleteDiscussion=async(discussionId)=>{
    try{
      const res = await deleteDiscussion({
        variables:{id:discussionId}
      })
      if(res.data){
        console.log(res.data);
      }
    }catch(err){
      console.log(err.message);
    }
  }
  const handleAssignmentCreation = async()=>{
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
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDay = `${day}${suffixes[day - 1]}`;
    const formattedDate = `${formattedDay} ${months[monthIndex]}, ${year} ${hours>9?hours:"0"+hours}:${minutes>9 ? minutes : "0"+minutes}`;
    return formattedDate;
}
  return (
    <div className='h-screen flex flex-col dark:bg-black dark:text-white'>
      <Topbar />
      <div className='flex flex-1 *:p-2'>
        <Sidebar />
        {lecture?.title && <div className='flex flex-1 flex-col space-y-4'>
          <div className='flex justify-between'>
            <div>
              <p className='text-2xl'>{lecture.title}</p>
              <p>{lecture.course.title}</p>
            </div>
            <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={() => setOpen(true)}>Create Assignment</button>
              <Modal open={open} title="Create Assignment"
                onCancel={handleCancel} 
                footer={(_, { CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <Button onClick={handleAssignmentCreation}>Add</Button>
                  </>)}>
                <div className="flex flex-col gap-4">
                  <Input type="text" placeholder="Task" value={assignment.content} onChange={(e)=>{setAssignment({...assignment,content:e.target.value})}}/>
                  <Input type="datetime-local" placeholder="Deadline" value={assignment.deadline} onChange={(e)=>{setAssignment({...assignment,deadline:e.target.value})}}/>
                </div>
              </Modal>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>{formatTimestamp(+lecture.createdAt)}</p>
          <div>
            <p>Assignments</p>
            {lecture?.assignment?.length>0 ?lecture.assignment.map((item)=>
            <div className='border my-2 p-1 dark:border-white border-black rounded' key={item.id}><p>{item.content}</p><p>Deadline: {formatTimestamp(+item.deadline)}</p></div>): <p>No Assignment Available</p>}
          </div>
          <div>
          <div className="flex justify-between items-center">
              <p className="text-xl font-mono">Discussions</p>
              <div>
              <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={() => setOpen1(true)}>Create Discussion</button>
                <Modal open={open1} title="Create Discussion"
                  onCancel={handleCancel}
                  footer={(_, { CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <Button onClick={handleDiscussionCreation}>Add</Button>
                    </>)}>
                  <div className="flex flex-col gap-4">
                    <Input type="text" placeholder="Issue" value={discussion.content} onChange={(e) => { setDiscussion({content:e.target.value}) }} />
                  </div>
                </Modal>
              </div>
            </div>
            {lecture?.discussion?.length>0 ?lecture.discussion.map((item)=>
            <div className='border dark:border-white my-2 p-1 border-black rounded flex justify-between items-center' key={item.id}><p>{item.content}</p>
            <Button onClick={()=>handleDeleteDiscussion(item.id)}>Delete</Button>
            </div>): <p>No Discussion Available</p>}
          </div>
          
        </div>}
      </div>
    </div>
  )
}

export {SingleLecture}