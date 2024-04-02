import { useMutation } from "@apollo/client";
import { Button } from "antd"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../utils/mutations";

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
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="border h-max w-[500px] flex flex-col p-6 px-10 space-y-6 rounded shadow">
        <h1 className="text-center font-semibold text-2xl">Sign In</h1>
        <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" onChange={handleChange} type="text" className="outline-none bg-gray-200 rounded border border-black p-1" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" onChange={handleChange} type="password" className="outline-none bg-gray-200 rounded border border-black p-1" />
          </div>
        <div className="flex justify-between">
          <Button className="w-max bg-black text-white" onClick={handleSubmit}>Submit</Button>
          <Button className="">Forget Your Password</Button>
        </div>
        <p>Not Registered? <Link to="/">Register</Link></p>
      </div>
    </div>
  )
}

export {Login,SignIn}