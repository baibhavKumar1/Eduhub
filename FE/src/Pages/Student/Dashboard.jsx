import Topbar from "./Topbar"
import { useEffect, useState } from 'react'
import CourseChooser from "../../Components/CourseChooser";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATION, GET_USER_DATA } from "../../utils/query";
import { Link } from 'react-router-dom'
import { socket } from "../../utils/Socket";
const Dashboard = () => {
    const { loading, data, refetch } = useQuery(GET_USER_DATA)
    const { loading: loading2, data: data2 } = useQuery(GET_NOTIFICATION)
    const [loggedIn, setLoggedIn] = useState(false)
    if (!loading) {
        console.log(data?.getUserData?.courses);
    }

    useEffect(() => {
        socket.on("sendLecture", (data) => {
            console.log("Received lecture:", data);
            refetch()
        });
        socket.on("sendAssignment", (data) => {
            console.log("Received Assignment:", data);
            refetch()
        });
    }, [refetch])
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const suffixes = ['st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st'];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedDay = `${day}${suffixes[day - 1]}`;
        const formattedDate = `${formattedDay} ${months[monthIndex]}, ${year} ${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes}`;
        return formattedDate;
    }
    return (
        <div className="h-screen flex flex-col">
            <Topbar />
            {(loggedIn === false) && (data?.getUserData?.courses?.length < 3 && data?.getUserData?.courses?.length >= 0) ?
                <CourseChooser setLoggedIn={setLoggedIn} /> :
                <div className="flex dark:bg-black dark:text-white flex-1">
                    {!loading && <div className="w-4/5 border-r dark:border-white border-black p-2" >
                        <div>
                            <p className="text-2xl">Lectures</p>
                            <div className="h-max rounded my-2 py-2 flex flex-col gap-2 ">
                                {data?.getUserData?.lectures.length > 0 ? (
                                    data?.getUserData.lectures
                                        .map((item) => (
                                            <Link to={`/slecture/${item.id}`} key={item.id}>
                                                <div className={`${item.completedBy.includes(data?.getUserData?.user?.id) ? 'bg-purple-500' : 'bg-gray-500 text-white'} p-4 rounded`} >
                                                    <p>{item.title}</p>
                                                    <div className="flex justify-between">
                                                        {item.completedBy.includes(data?.getUserData?.user?.id) ? <p>Completed</p> : <p>Pending</p>}
                                                        <p>Uploaded at: {formatTimestamp(+item.createdAt)}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                ) : (
                                    <p>No Lectures Available</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl">Assignments</p>
                            <div className="h-max rounded my-2 p-2 flex flex-col gap-2">
                                {data?.getUserData?.assignments?.length > 0 ? (data?.getUserData?.assignments.map((item) => {
                                    return (
                                        <Link to={`/sassignment/${item.id}`} key={item.id}>
                                            <div className={` ${item.completedBy.includes(data?.getUserData?.user?.id) ? 'bg-purple-500' : 'bg-gray-500 text-white'} p-4 rounded`}>
                                                <p>Title: {item.content}</p>
                                                <div className="flex justify-between">
                                                    {item.completedBy.includes(data?.getUserData?.user?.id) ? <p>Completed</p> : <p>Pending</p>}
                                                    <p>Ends at: {formatTimestamp(+item.deadline)}</p>
                                                </div>
                                            </div></Link>
                                    )
                                })) : <p>No Assignments Available</p>
                                }
                            </div>
                        </div>
                    </div>}
                    <div className="w-1/5">
                        <p className="text-2xl text-center">Recent Updates</p>
                        <div>
                            {!loading2 && data2?.getNotifications?.map((item) => (<p className="border rounded p-1 m-2" key={item.id}>{item.message}</p>))}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export { Dashboard }