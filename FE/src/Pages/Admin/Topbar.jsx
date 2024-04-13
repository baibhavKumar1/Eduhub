import { NotificationOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons"
import { Input, Switch } from "antd"
import { Link,useNavigate } from "react-router-dom"

const Topbar = () => {
  const navigate = useNavigate()
    const logout=()=>{
        alert('Logged Out');
        localStorage.removeItem('token');
        navigate('/login')
    }
  return (
    <div className="border-b border-black flex justify-between p-2 items-center">
    <Link to="/dashboard"><p className="text-2xl">Eduhub</p></Link>
    <Input className="w-96" placeholder="Search for any lectures, courses, students..."/>
        
    <div className="flex gap-4">
   
    <Switch checkedChildren="1" unCheckedChildren="0" className="border border-black"/>
 
    <SettingOutlined spin/> 
        <NotificationOutlined/>
        <UserOutlined onClick={logout}/>        
        </div>
    </div>
  )
}

export default Topbar