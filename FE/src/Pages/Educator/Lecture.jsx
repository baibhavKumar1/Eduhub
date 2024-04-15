import Topbar from './Topbar'
import Sidebar from './Sidebar'
import { Button, Collapse, Input, Modal, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_DATA } from '../../utils/query';
import { useEffect, useState } from 'react';
import { CREATE_LECTURE } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import { socket } from '../../utils/Socket';

const Lecture = () => {
  const [open, setOpen] = useState(false);
  const { data,refetch } = useQuery(GET_USER_DATA)
  const [lecture,setLecture]=useState({title:"",duration:"",url:"",course:"Select courses"})
  
  useEffect(()=>{
    socket.on("sendLecture", (data) => {
      console.log("Received lecture:", data);
      refetch()
    });
  },[refetch])

  
  
  const selectOptions = data?.getUserData.courses.map(item=>({
     value:item.id,label:item.title
  }))
  const [createLecture] = useMutation(CREATE_LECTURE, {onCompleted:()=>refetch()})
  const handleCancel= ()=>{
    setLecture({title:"",duration:"",url:"",course:"Select courses"})
    setOpen(false)
  }
  const handleSubmit = async()=>{
    try{
      const res = await createLecture({
        variables:{...lecture}
      })
      if(res.data){
        console.log(res.data);
      }
    }catch(err){
      console.log(err.message);
    }
    setLecture({title:"",duration:"",url:"",course:"Select courses"})
    setOpen(false)
  }
  const handleChange=(value)=>{
    setLecture({...lecture,course:value})
  }
  
  const collapseValue = data?.getUserData.courses.map(course => {
    const courseLectures = data?.getUserData.lectures.filter(lecture => lecture.course.id === course.id);
    return {
      key: course.id,
      label: course.title,
      children: (
        <div className='flex flex-col gap-2'>
          {courseLectures.length > 0 ? 
            courseLectures.map((lecture, index) => (
              <div key={index} className='flex'>
              <Link to= { `/electure/${lecture.id}`} className='border border-black p-1 rounded flex-1'><p className='text-'>{lecture.title}</p></Link>
              <div>
              <Button>Edit</Button>
              <Modal open={open} title="Create Course"
                onCancel={handleCancel} 
                footer={(_, { CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <Button onClick={handleSubmit}>Add</Button>
                    
                  </>)}>
                <div className="flex flex-col gap-4">
                  <Select
                    defaultValue="select"
                    style={{width: 120}}
                    value={lecture.course}
                    onChange={handleChange}
                    options={selectOptions}
                  />
                  <Input type="text" placeholder="Title" value={lecture.title} onChange={(e)=>{setLecture({...lecture,title:e.target.value})}}/>
                  <Input type="text" placeholder="URL" value={lecture.url} onChange={(e)=>{setLecture({...lecture,url:e.target.value})}}/>
                  <Input type="text" placeholder="Duration" value={lecture.duration} onChange={(e)=>{setLecture({...lecture,duration:e.target.value})}}/>
                </div>
              </Modal></div>
              <Button>Delete</Button>
              </div>
            )) 
            : 
            <p>No Lectures Available</p>
          }
        </div>
      )
    };
  });
  return (
    <div className='h-screen flex flex-col dark:bg-black dark:text-white'>
      <Topbar />
      <div className='flex flex-1 *:p-2'>
        <Sidebar />
        <div className='flex flex-1 flex-col space-y-4'>
          <div className="flex-1 flex flex-col gap-2" >
            <div className='flex justify-between'>
              <p className="text-2xl">My Lectures: </p>
              <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={() => setOpen(true)}>Create Lecture</button>
              <Modal open={open} title="Create Course"
                onCancel={handleCancel} 
                footer={(_, { CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <Button onClick={handleSubmit}>Add</Button>
                    
                  </>)}>
                <div className="flex flex-col gap-4">
                  <Select
                    defaultValue="select"
                    style={{width: 120}}
                    value={lecture.course}
                    onChange={handleChange}
                    options={selectOptions}
                  />
                  <Input type="text" placeholder="Title" value={lecture.title} onChange={(e)=>{setLecture({...lecture,title:e.target.value})}}/>
                  <Input type="text" placeholder="URL" value={lecture.url} onChange={(e)=>{setLecture({...lecture,url:e.target.value})}}/>
                  <Input type="text" placeholder="Duration" value={lecture.duration} onChange={(e)=>{setLecture({...lecture,duration:e.target.value})}}/>
                </div>
              </Modal>
            </div>

            <Collapse accordion items={collapseValue} className='bg-white'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Lecture }