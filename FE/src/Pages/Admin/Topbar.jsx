import { NotificationOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons"
import { Input } from "antd"
import { Link } from "react-router-dom"

const Topbar = () => {
  return (
    <div className="border-b flex justify-between p-2 items-center">
    <Link to="/" className="text-2xl">Eduhub</Link>
    <Input className="w-96" placeholder="Search for any lectures, courses, students..."/>
        
    <div className="flex gap-4">
    <SettingOutlined spin/> 
        <NotificationOutlined/>
        <UserOutlined/>        
        </div>
    </div>
  )
}

export default Topbar