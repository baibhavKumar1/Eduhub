import { NotificationFilled, UserOutlined } from '@ant-design/icons'


const Topbar = () => {
    return (
        <div className="flex justify-between p-2 border-b items-center">
            <p className="text-xl">EduHub</p>
            <div className="flex gap-4">
                <NotificationFilled />
                <UserOutlined />
            </div>
        </div>
    )
}

export default Topbar