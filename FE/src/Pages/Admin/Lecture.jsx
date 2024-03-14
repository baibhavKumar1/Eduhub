import { Button } from 'antd'
import Sidebar from '../../Components/Sidebar'
import Topbar from '../../Components/Topbar'

const Lecture = () => {
  return (
    <div className='flex'>
    <Sidebar/>
    <div className='p-2 w-5/6'>
    <Topbar/>
    <div className='flex flex-col space-y-4'>
    <div className='flex justify-between p-1'>
      <p className='text-2xl'>First Lecture</p>
      <Button className='mt-2'>Create Assignment</Button>
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>12th March 2024</p>
      <p>Assignment</p>
      </div>
    </div>
    </div>
  )
}

export default Lecture