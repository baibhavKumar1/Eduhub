import Topbar from "./Topbar"
import Sidebar from "./Sidebar"

const Lectures = () => {
  return (
    <div className="h-screen flex flex-col">
        <Topbar/>
        <div className="flex flex-1 *:p-2">
            <Sidebar/>
            <div>Hi</div>
        </div>
    </div>
  )
}

export default Lectures