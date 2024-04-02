import Topbar from "./Topbar"
import Sidebar from "./Sidebar"
import { useState } from "react";
import { Button, Modal, Input } from "antd"
import { useMutation, useQuery } from "@apollo/client";
import { GET_EDUCATORS } from "../../utils/query";
import { CREATE_USER } from "../../utils/mutations";
const Educators = () => {
  const [open, setOpen] = useState(false);
  const {data,refetch} = useQuery(GET_EDUCATORS);
  const [createUser] = useMutation(CREATE_USER,{onCompleted:()=>refetch()})
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
  return (
    <div className="h-screen flex flex-col">
        <Topbar/>
        <div className="flex flex-1 *:p-2">
            <Sidebar/>
            <div className="flex-1 flex flex-col ">
            <div className="flex justify-between ">
              <p className="text-2xl">Educators: </p>
              <Button onClick={showModal}>Add Educator</Button>
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
              <div></div>
            </div>
            <div className="flex flex-wrap gap-8 *:w-[200px] *:h-[200px] *:border *:text-center justify-center p-4 *:flex *:justify-center *:flex-col *:rounded">
              {data?.getEducators && data?.getEducators?.map((item)=>{
                return(
                  <div className="border " key={item.id}>
                <p>{item.username.toUpperCase()}</p>
                <p>This is the first batch of MERN stack development</p>
                <p>Courses: 23</p>
              </div>
              )})}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Educators