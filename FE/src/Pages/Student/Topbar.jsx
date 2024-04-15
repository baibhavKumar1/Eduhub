import { NotificationFilled, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { ModeToggle } from '../../Components/Toggle'

const Topbar = () => {
    const navigate = useNavigate()
    const logout = () => {
        alert('Logged Out');
        localStorage.removeItem('token');
        navigate('/login')
    }
    // const onChange = (checked) => {
    //     console.log(`switch to ${checked}`);
    // };
    return (
        <div className="flex justify-between p-2 border-b dark:border-white dark:bg-black dark:text-white border-black items-center">
            
            <Link to="/sdashboard"><p className="text-2xl">Eduhub</p></Link>
            <Input placeholder='Search for any lectures, assignments, or users...' className='w-96' />
            <div className="flex gap-4">
                <ModeToggle />
                <SettingOutlined spin />
                <NotificationFilled />
                <UserOutlined onClick={logout} />
            </div>
        </div>
    )
}

export default Topbar