import { useQuery } from '@apollo/client';
import { Collapse } from 'antd';
import { GET_USER_DATA } from '../utils/query';
import { Link } from 'react-router-dom';


const Trial = () => {
  const {data} = useQuery(GET_USER_DATA)
  console.log(data);
  const collapseValue = data?.getUserData.courses.map(item => ({
    key: item.id,
    label: item.title,
    children: (
      <div className='flex flex-col gap-2'>
        {item.length > 0 ?  data?.getUserData.lectures.map((lecture, index) => (
          <Link to={`/lecture/${lecture.id}`} key={index}>{lecture.title}</Link>
        )) : <p>No Lectures Available</p>}
      </div>
    )
  }));
  return (
    <Collapse accordion items={collapseValue} />
  )
};
export default Trial;
