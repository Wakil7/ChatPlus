// import React, { useState } from 'react';
// import {IoIosSend} from 'react-icons/io';
// import {useDispatch, useSelector} from 'react-redux';
// import {sendMessageThunk} from '../../store/slice/message/message.thunk.js'

// const SendMessage = () => {
//     const [message, setMessage] = useState("");
//     const dispatch = useDispatch();
//     const {selectedUser} = useSelector(state=>state.userReducer);

//     const handleSendMessage = () => {
//         dispatch(sendMessageThunk({receiverId:selectedUser?._id, message}));
//         setMessage("");
//     }
//     return (
//         <div className="w-full p-3 flex gap-2">
//             <input type="text" placeholder="Type here..." className="input input-primary input-bordered w-full" 
//             value={message} onChange={(e)=>setMessage(e.target.value)}/>
//             <button onClick={handleSendMessage} class="btn btn-square btn-outline btn-primary">
//                 <IoIosSend />
//             </button>
//         </div>
//     )
// }

// export default SendMessage;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import {
    pushMessage,
} from "../../store/slice/message/message.slice";

const SendMessage = () => {

    const [message, setMessage] =
        useState("");

    const dispatch = useDispatch();

    const { selectedUser } =
        useSelector((state) => state.userReducer);


    const handleSend = async () => {

        if (!message.trim()) return;

        const res = await axios.post(
            `/api/message/send/${selectedUser._id}`,
            { message }
        );

        dispatch(
            pushMessage(res.data.responseData)
        );

        setMessage("");
    };


    return (
        <div className="flex gap-2 p-3">

            <input
                type="text"
                value={message}
                onChange={(e) =>
                    setMessage(e.target.value)
                }
                placeholder="Type message..."
                className="flex-1 input input-bordered"
            />

            <button
                onClick={handleSend}
                className="btn btn-primary"
            >
                Send
            </button>

        </div>
    );
};

export default SendMessage;