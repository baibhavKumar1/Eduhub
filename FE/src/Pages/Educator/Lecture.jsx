import Topbar from './Topbar'
import Sidebar from './Sidebar'
import { Button, Collapse, Input, Modal, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_DATA } from '../../utils/query';
import { useState } from 'react';
import { CREATE_LECTURE } from '../../utils/mutations';
import { Link } from 'react-router-dom';
// import {io} from 'socket.io-client'
const Lecture = () => {
  const [open, setOpen] = useState(false);
  const { data,refetch } = useQuery(GET_USER_DATA)
  const [lecture,setLecture]=useState({title:"",duration:"",url:"",course:"Select courses"})

  const collapseValue = data?.getUserData.courses.map(course => {
    const courseLectures = data?.getUserData.lectures.filter(lecture => lecture.course.id === course.id);
    return {
      key: course.id,
      label: course.title,
      children: (
        <div className='flex flex-col gap-2'>
          {courseLectures.length > 0 ? 
            courseLectures.map((lecture, index) => (
              <Link to= {`/electure/${lecture.id}`} key={index}>{lecture.title}</Link>
            )) 
            : 
            <p>No Lectures Available</p>
          }
        </div>
      )
    };
  });
  
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
  return (
    <div className='h-screen flex flex-col'>
      <Topbar />
      <div className='flex flex-1 *:p-2'>
        <Sidebar />
        <div className='flex flex-1 flex-col space-y-4'>
          <div className="flex-1 flex flex-col gap-2" >
            <div className='flex justify-between'>
              <p className="text-2xl">My Lectures: </p>
              <Button onClick={()=>setOpen(true)}>Create Lecture</Button>
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

            <Collapse accordion items={collapseValue} />
          </div>
        </div>
      </div>
    </div>
  )
}

export { Lecture }