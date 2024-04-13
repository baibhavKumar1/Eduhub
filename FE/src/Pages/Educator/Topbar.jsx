import { NotificationFilled, UserOutlined,SettingOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'


const Topbar = () => {
    const navigate = useNavigate()
    const logout=()=>{
        alert('Logged Out');
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <div className="flex justify-between p-2 border-b border-black items-center">
            <Link to="/edashboard"><p className="text-2xl">Eduhub</p></Link>
            <Input placeholder='Search for any lectures, assignments, or users...' className='w-96'/>
            <div className="flex gap-4">
            <SettingOutlined spin/> 
                <NotificationFilled />
                <UserOutlined onClick={logout}/>
            </div>
        </div>
    )
}

export default Topbar