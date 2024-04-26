import React, { useEffect, useState } from 'react'
import PostTitle from './PostTitle';
import { useSelector } from 'react-redux';
import axios from "axios";
import { BACKENDURL } from "../utils/BACKENDURL";

const TableContainer = () => {
    const [data, setData] = useState([])
    const token = useSelector((state) => state.auth);

    const getData = async () => {
        try {
            const response = await axios.get(`${BACKENDURL}/scheduledpost`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
            setData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${BACKENDURL}/deleteSchedulePost/${postId}`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                getData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const getTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const formattedTime = `${hours}:${minutes}:${seconds}`;
        return formattedTime;
    }
    
    if (data?.length === 0) {
        return (
            <div className="no-scheduled-post-text">
                No Scheduled Post
            </div>
        )
    }
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Post Text</th>
                        <th>Post Image</th>
                        <th>Scheduled Time</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((post) => (
                        <tr key={post._id}>
                            <td><PostTitle title={post.title} /></td>
                            <td><img src={post.image} alt="image" /></td>
                            <td>{getTime(post.scheduledTime)}</td>
                            <td><button className='delete' onClick={() => deletePost(post._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableContainer;
