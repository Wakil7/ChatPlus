import React, {useState, useEffect} from 'react';
import { IoSearch } from "react-icons/io5";
import User from './User'
import {useDispatch, useSelector} from 'react-redux'
import {logoutUserThunk, getOtherUsersThunk} from '../../store/slice/user/user.thunk.js'

const UserSidebar = () => {

    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const [users, setUsers] = useState([]);
    const {userProfile, otherUsers} = useSelector(state=>state.userReducer);
    useEffect(()=>{
        (async()=>{
            dispatch(getOtherUsersThunk());
        })();
    }, []);

    useEffect(()=>{
        if (!searchValue){
            setUsers(otherUsers);
            return;
        }
        setUsers(otherUsers.filter(user=>user.username.toLowerCase().includes(searchValue.toLowerCase()) || user.fullName.toLowerCase().includes(searchValue.toLowerCase())));
    }, [searchValue])

    const handleLogout = async() => {
        const response = await dispatch(logoutUserThunk());
        
    }
    return (
        <div className="max-w-[20rem] w-full h-screen flex flex-col border-r border-r-white/10">
            {/* <div> */}
                <h1 className="bg-black mx-3 mt-3 px-2 py-1 text-[#7480FF] text-xl font-semibold rounded-lg">Chat Plus</h1>
            {/* </div> */}
            <div className="p-3">
                <label class="input">
                <IoSearch/>
                <input onChange={e=>setSearchValue(e.target.value)} type="search" required placeholder="Search" />
                </label>
            </div>
            <div className="h-full overflow-y-auto px-3 flex flex-col gap-2">
                {users?.map(userDetails=>{
                    return (
                        <User key={userDetails?._id} userDetails={userDetails}/>
                    )
                })}
              
            </div>
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                        <img src={userProfile?.avatar} />
                    </div>
                </div>
                    <h2>{userProfile?.username}</h2>
                </div>
                <button onClick={handleLogout} className="btn btn-primary btn-sm px-4">Logout</button>
            </div>

        </div>
    )
}

export default UserSidebar;