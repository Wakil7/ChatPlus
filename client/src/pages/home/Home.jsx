import React, {useEffect} from 'react'
import UserSidebar from './UserSidebar'
import MessageContainer from './MessageContainer'
import { initializeSocket, setOnlineUsers } from '../../store/slice/socket/socket.slice.js';
import { pushMessage } from '../../store/slice/message/message.slice.js';
import {useSelector, useDispatch} from 'react-redux';

function Home(){
    const dispatch = useDispatch();
    const {isAuthenticated, userProfile} = useSelector(state=>state.userReducer);
    const {socket} = useSelector(state=>state.socketReducer);
    useEffect(()=>{
        if (!isAuthenticated || !userProfile) return;
        dispatch(initializeSocket(userProfile?._id));
    }, [isAuthenticated, userProfile]);

    useEffect(()=>{
        if (!socket) return;
        socket.on("onlineUsers", (onlineUsers)=>{
            dispatch(setOnlineUsers(onlineUsers));
        });
        socket.on("newMessage", (newMessage)=>{
            dispatch(pushMessage(newMessage));
        });
        return ()=>{
            socket.close();
        }
        
    }, [socket]);


    return (
        <div className="flex">
            <UserSidebar/>
            <MessageContainer/>
        </div>
    )
}

export default Home;