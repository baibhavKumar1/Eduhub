import { Input } from "antd"
import Topbar from "./Topbar"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client";
import { GET_SINGLE_ASSIGNMENT } from "../../utils/query";
import { useEffect, useState } from "react";
import { COMPLETE_ASSIGNMENT } from "../../utils/mutations";


const SingleAssignment = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const {data} = useQuery(GET_SINGLE_ASSIGNMENT,{
    variables:{id}
  });
  const [completeAssignment] = useMutation(COMPLETE_ASSIGNMENT)
  const handleSubmit=async()=>{
    try{
      const res = await completeAssignment({
        variables:{id}
      })
      if(res?.data){
        console.log(res.data);
        navigate('/sdashboard')
      }
    }catch(err){
      alert(err)
    }
  }
  const [assignment,setAssignment] = useState({})
  console.log(data?.getSingleAssignment);
  useEffect(()=>{setAssignment(data?.getSingleAssignment)},[data?.getSingleAssignment])
  return (
    <div className="flex flex-col h-screen">
      <Topbar/>
      <div className="p-6 space-y-4 dark:bg-black dark:text-white flex-1">
      <p className="text-2xl text-center">{assignment?.content}</p>
      <p className="py-2">Complete the assignment</p>
      <Input type="url" placeholder="Enter Submission Link" className="border-black dark:border-white w-full"/>
      <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export {SingleAssignment}