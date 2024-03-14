import { NotificationOutlined, UserOutlined } from "@ant-design/icons"
import { Input } from "antd"

const Topbar = () => {
  return (
    <div className="border-b w-[80vw] flex justify-between p-2">
    <Input className="w-96"/>
        
    <div className="flex gap-4"> 
        <UserOutlined/>
        <NotificationOutlined/>
        </div>
    </div>
  )
}

export default Topbar