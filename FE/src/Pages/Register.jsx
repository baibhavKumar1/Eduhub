import { Button } from "antd"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-around items-center h-screen">
        <p className="text-3xl">Eduhub</p>
        <div className="border h-max w-[500px] flex flex-col p-6 px-10 space-y-2 rounded shadow">
            <h1 className="text-center font-semibold text-2xl">Sign Up</h1>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" className="outline-none bg-gray-200 rounded border border-black p-1"/>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" className="outline-none bg-gray-200 rounded border border-black p-1"/>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" className="outline-none bg-gray-200 rounded border border-black p-1"/>
            <div className="flex justify-between">
<Button className="w-max bg-black text-white" onClick={()=>navigate('/dashboard')}>Submit</Button>
<Button>Forget Your Password</Button>
            </div>
            
            <Button>Join with Google</Button>
        </div>
        <div className="flex justify-between">
            <p>Already Registered?</p>
        </div>
    </div>
  )
}

export default Register