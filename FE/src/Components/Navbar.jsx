import { UserOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import { ModeToggle } from "./Toggle"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className="border-b border-black dark:border-white flex justify-between p-2 items-center dark:bg-black dark:text-white">
      <Link to="/"><p className="text-2xl">Eduhub</p></Link>
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <UserOutlined onClick={()=>navigate('/login')}>Join</UserOutlined>
      </div>
    </div>
  )
}

export default Navbar