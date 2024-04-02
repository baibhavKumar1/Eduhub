import { Button } from "antd"
import { useState } from "react";
import { CREATE_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
  const [createUser] = useMutation(CREATE_USER)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role:""
  })

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const mutationResponse = await createUser({
        variables: {
          email: formData.email,
          password:formData.password,
          username:formData.username
        }
      });
      if(mutationResponse.data){
        const {token,user }= mutationResponse.data.createUser;
        localStorage.setItem('token',token);
        if(user.role === "Admin"){
          navigate('/dashboard')
        }else if(user.role === "Educator"){
          navigate('/dashboard')
        }else{
          navigate('/sdashboard')
        }
      }
    }catch(err){
      alert(err);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="border h-max w-[500px] flex flex-col p-6 px-10 space-y-6 rounded shadow">
        <h1 className="text-center font-semibold text-2xl">Sign Up</h1>
        <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <input id="name" name="username" required onChange={handleChange} type="text" className="outline-none bg-gray-200 rounded border border-black p-1" />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" required onChange={handleChange} type="text" className="outline-none bg-gray-200 rounded border border-black p-1" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" onChange={handleChange} type="password" className="outline-none bg-gray-200 rounded border border-black p-1" />
          </div>
        <div className="flex justify-between">
          <Button className="w-max bg-black text-white" onClick={handleSubmit}>Submit</Button>
          <Button className="">Forget Your Password</Button>
        </div>
        <p>Already Registered? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register