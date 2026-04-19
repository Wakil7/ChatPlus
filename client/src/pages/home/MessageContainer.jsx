// import React, { useEffect } from 'react'
// import User from './User'
// import Message from './Message'
// import { useSelector, useDispatch } from 'react-redux';
// import { getMessagesThunk } from '../../store/slice/message/message.thunk.js'
// import SendMessage from './SendMessage';

// const MessageContainer = () => {
//     const { selectedUser } = useSelector(state => state.userReducer);
//     const { messages } = useSelector(state => state.messageReducer);
//     const dispatch = useDispatch();
//     useEffect(() => {
//         if (!selectedUser?._id) return;
//         dispatch(getMessagesThunk({ receiverId: selectedUser?._id }));
//     }, [selectedUser])
//     return (
//         <>
//             {(selectedUser) ? (
//                 <>
//                     <div className="h-screen w-full flex flex-col">
//                         <div className="p-3 border-b border-b-white/10">
//                             <User userDetails={selectedUser} />
//                         </div>
//                         <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
//                             {messages?.map((messageDetails) => (
//                                 <Message
//                                     key={messageDetails._id}
//                                     messageDetails={messageDetails}
//                                 />
//                             ))}
//                         </div>
//                         <SendMessage />
//                     </div>
//                 </>
//             ) :
//                 (
//                     <div className="flex items-center justify-center flex-col gap-5 w-full">
//                         <h2>Welcome to Chat Plus</h2>
//                         <p className="text-xl">Please Select an User</p>
//                         </div>
//                 )}
//         </>


//     )
// }

// export default MessageContainer;

import React, { useEffect } from 'react'
import User from './User'
import Message from './Message'
import { useSelector, useDispatch } from 'react-redux';
import { getMessagesThunk } from '../../store/slice/message/message.thunk.js'
import SendMessage from './SendMessage';

const MessageContainer = () => {

    const dispatch = useDispatch();

    const { selectedUser } =
        useSelector((state) => state.userReducer);

    const { messages } =
        useSelector((state) => state.messageReducer);


    useEffect(() => {

        if (!selectedUser?._id) return;

        const getMessages = async () => {

            const res = await axios.get(
                `/api/message/${selectedUser._id}`
            );

            dispatch(
                setMessages(res.data.responseData)
            );

        };

        getMessages();

    }, [selectedUser?._id]); // ✅ FIX


    return (
        <div className="flex flex-col gap-3 p-4 overflow-y-auto">

            {messages?.map((msg) => (
                <Message
                    key={msg._id}
                    messageDetails={msg}
                />
            ))}

        </div>
    );
};

export default MessageContainer;