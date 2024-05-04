import { useMutation } from "@apollo/client";
import { Input } from "antd"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Navbar from "../Components/Navbar";

const SignIn = async(login,navigate,formData)=>{
  try {
      const mutationResponse = await login({
        variables: {
          email: formData.email,
          password: formData.password,
        }
      });
      if (mutationResponse.data) {
        const { token, user } = mutationResponse.data.login;
        localStorage.setItem('token', token);
        if (user.role === "Admin") {
          navigate('/dashboard')
        } else if (user.role === "Educator") {
          navigate('/edashboard')
        } else {
          navigate('/sdashboard')
        }
      }
    } catch (err) {
      alert(err);
    }
 }
const Login = () => {
  const [login] = useMutation(LOGIN)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    SignIn(login,navigate,formData)
  }
  return (
    <div className="flex flex-col h-screen dark:bg-black dark:text-white">
    <Navbar/>
    <div className="flex-1 flex items-center m-auto">
      <div className="border h-max w-[500px] flex flex-col p-6 px-10 space-y-6 rounded shadow-xl">
        <h1 className="text-center font-semibold text-2xl">Sign In</h1>
        <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <Input id="email" name="email" onChange={handleChange} type="text" className="outline-none bg-gray-200 p-1" />
        <label htmlFor="password">Password</label>
        <Input id="password" name="password" onChange={handleChange} type="password" className="outline-none bg-gray-200 p-1"/>
          </div>
        <div className="flex justify-between">        
        <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={handleSubmit}>Submit</button>
        <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" >Forgot Your Password</button>
        </div>
        <p>Not Registered? <Link to="/register"><u>Register</u></Link></p>
      </div>
      </div>
    </div>
  )
}

export {Login,SignIn}