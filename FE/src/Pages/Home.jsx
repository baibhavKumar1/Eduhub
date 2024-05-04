import { Link, useNavigate } from "react-router-dom"
import { ModeToggle } from "../Components/Toggle"
import { UserOutlined } from "@ant-design/icons"

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="sticky top-0 z-50">
        <div className="border-b border-black bg-amber-50 dark:border-white flex justify-between p-2 items-center dark:bg-black dark:text-white">
          <Link to="/"><p className="text-2xl">Eduhub</p></Link>
          <div className="flex gap-4 items-center">
            <ModeToggle />
            <UserOutlined onClick={() => navigate('/login')}>Join</UserOutlined>
          </div>
        </div>
      </div>
      <div className="relative">
        <img src="https://cdn.dribbble.com/userupload/4063018/file/original-f2a568b0ce7436fbb64db2fde292ffdf.png?resize=1600x8518" className="absolute -top-28 left-0 pointer-events-none" />
      </div>
    </>
  )
}

export default Home