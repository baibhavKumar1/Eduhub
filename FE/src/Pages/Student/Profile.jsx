import { useQuery } from '@apollo/client'
import { GET_SINGLE_USER } from '../../utils/query'
import { useEffect, useState } from 'react'


const Profile = () => {
    let [user,setUser] = useState() 
    const { data, loading, error } = useQuery(GET_SINGLE_USER)
    useEffect(() => {
        if (!loading && !error && data) {
            setUser(data.getSingleUser);
        }
    }, [data, loading, error]);
    return (
        <>
        {loading ? <div>Loading</div> : <div>{user?.email}</div>}
        </>
    )
}

export default Profile