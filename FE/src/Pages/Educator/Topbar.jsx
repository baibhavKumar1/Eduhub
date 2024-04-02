import { NotificationFilled, UserOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useNavigate } from 'react-router-dom'


const Topbar = () => {
    const navigate = useNavigate()
    const logout=()=>{
        alert('Logged Out');
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <div className="flex justify-between p-2 border-b items-center">
            <p className="text-xl">EduHub</p>
            <Input placeholder='Search for any lectures, assignments, or users...' className='w-96'/>
            <div className="flex gap-4">
                <NotificationFilled />
                <UserOutlined onClick={logout}/>
            </div>
        </div>
    )
}

export default Topbar