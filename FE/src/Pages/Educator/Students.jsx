import Topbar from './Topbar'
import Sidebar from './Sidebar'
import { Collapse } from 'antd';
import {useQuery} from '@apollo/client'
import { GET_USER_DATA } from '../../utils/query';

const Student = () => {
  const {data} = useQuery(GET_USER_DATA)
  
  const value = data?.getUserData?.courses.map(course => {
    const courseUsers = course.users || [];
    return {
      key: course.id,
      label: course.title,
      children: (
        <div className='flex flex-col gap-2' key={course.id}>
          {courseUsers.length > 0 ? 
            courseUsers.map((user,index) => (
              <div key={user.id}>{index+1}. {user.username}</div>
            )) 
            : 
            <p>No Users Available</p>
          }
        </div>
      )
    };
  });
  return (
    <div className='h-screen flex flex-col dark:bg-black dark:text-white'>
      <Topbar />
      <div className='flex flex-1 *:p-2'>
        <Sidebar />
        <div className='flex flex-1 flex-col space-y-4'>
        <div className="flex-1 flex flex-col gap-2" >
        
          <p className="text-2xl">My Students: </p>
                  
          <Collapse accordion items={value} className='bg-white'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Student}