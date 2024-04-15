import { NotificationOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons"
import { Input } from "antd"
import { Link,useNavigate } from "react-router-dom"
import { ModeToggle } from "../../Components/Toggle"

const Topbar = () => {
  const navigate = useNavigate()
    const logout=()=>{
        alert('Logged Out');
        localStorage.removeItem('token');
        navigate('/login')
    }
  return (
    <div className="border-b dark:bg-black dark:text-white dark:border-white border-black flex justify-between p-2 items-center">
    <Link to="/dashboard"><p className="text-2xl">Eduhub</p></Link>
    <Input className="w-96" placeholder="Search for any lectures, courses, students..."/>
        
    <div className="flex gap-4">
   
    <ModeToggle/>
    <SettingOutlined spin/> 
        <NotificationOutlined/>
        <UserOutlined onClick={logout}/>        
        </div>
    </div>
  )
}

export default Topbar