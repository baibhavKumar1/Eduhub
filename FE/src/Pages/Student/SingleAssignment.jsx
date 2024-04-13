import { Button, Input } from "antd"
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
    <div>
      <Topbar/>
      <div className="m-3 p-3 space-y-4 border">
      <p className="text-2xl text-center">Assignment : {assignment?.content}</p>
      <p>Complete the assignment</p>
      <Input type="url" placeholder="Enter Submission Link" className="border-black w-full"/>
      <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export {SingleAssignment}