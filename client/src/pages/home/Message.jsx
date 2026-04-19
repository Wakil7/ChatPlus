// // import React, {useRef, useEffect} from "react";
// // import { useSelector } from "react-redux";

// // const Message = ({ messageDetails }) => {
// //     const messageRef = useRef(null);
// //     const { userProfile, selectedUser } = useSelector((state) => state.userReducer);

// //     if (!messageDetails) return null;

// //     const isMe = messageDetails.senderId === userProfile?._id;

// //     useEffect(()=>{
// //         if (messageRef.current){
// //             messageRef.current.scrollIntoView({ behavior: "smooth" })
// //         }
// //     })

// //     return (

// //         <div ref={messageRef} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
// //             <div className={`flex items-end gap-2 max-w-[70%]`}>
// //                 {!isMe && (
// //                     <img
// //                         src={selectedUser?.avatar}
// //                         alt="avatar"
// //                         className="w-8 h-8 rounded-full"
// //                     />
// //                 )}

// //                 <div>
// //                     <div
// //                         className={`px-4 py-2 rounded-2xl text-sm ${
// //                             isMe
// //                                 ? "bg-blue-600 text-white rounded-br-none"
// //                                 : "bg-gray-700 text-white rounded-bl-none"
// //                         }`}
// //                     >
// //                         {messageDetails.message}
// //                     </div>

// //                     <div className="text-[10px] text-gray-400 mt-1 text-right">
// //                         {new Date(messageDetails.createdAt).toLocaleTimeString([], {
// //                             hour: "2-digit",
// //                             minute: "2-digit",
// //                         })}
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Message;


// import React, { useRef, useEffect } from "react";
// import { useSelector } from "react-redux";

// const Message = ({ messageDetails }) => {

//     const messageRef = useRef(null);

//     const { userProfile, selectedUser } =
//         useSelector((state) => state.userReducer);

//     // Prevent crash if message missing
//     if (!messageDetails) return null;

//     // ✅ FIX: Convert IDs to string before comparing
//     const isMe =
//         messageDetails.senderId?.toString() ===
//         userProfile?._id?.toString();

//     // ✅ Scroll only when message changes
//     useEffect(() => {
//         if (messageRef.current) {
//             messageRef.current.scrollIntoView({
//                 behavior: "smooth",
//             });
//         }
//     }, [messageDetails]);

//     return (
//         <div
//             ref={messageRef}
//             className={`flex ${
//                 isMe ? "justify-end" : "justify-start"
//             }`}
//         >
//             <div className="flex items-end gap-2 max-w-[70%]">

//                 {/* Show avatar only for other user */}
//                 {!isMe && (
//                     <img
//                         src={
//                             selectedUser?.avatar ||
//                             "/default-avatar.png"
//                         }
//                         alt="avatar"
//                         className="w-8 h-8 rounded-full"
//                     />
//                 )}

//                 <div>

//                     {/* Message Bubble */}
//                     <div
//                         className={`px-4 py-2 rounded-2xl text-sm ${
//                             isMe
//                                 ? "bg-blue-600 text-white rounded-br-none"
//                                 : "bg-gray-700 text-white rounded-bl-none"
//                         }`}
//                     >
//                         {messageDetails.message}
//                     </div>

//                     {/* Timestamp */}
//                     <div className="text-[10px] text-gray-400 mt-1 text-right">
//                         {messageDetails.createdAt &&
//                             new Date(
//                                 messageDetails.createdAt
//                             ).toLocaleTimeString([], {
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                             })}
//                     </div>

//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Message;


import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Message = ({ messageDetails }) => {

    const messageRef = useRef(null);

    const { userProfile, selectedUser } =
        useSelector((state) => state.userReducer);

    if (!messageDetails) return null;

    // ✅ CRITICAL FIX
    const isMe =
        messageDetails.senderId?.toString() ===
        userProfile?._id?.toString();

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [messageDetails]);

    return (
        <div
            ref={messageRef}
            className={`flex ${
                isMe
                    ? "justify-end"
                    : "justify-start"
            }`}
        >
            <div className="flex items-end gap-2 max-w-[70%]">

                {!isMe && (
                    <img
                        src={
                            selectedUser?.avatar ||
                            "/default-avatar.png"
                        }
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                    />
                )}

                <div>

                    <div
                        className={`px-4 py-2 rounded-2xl text-sm ${
                            isMe
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-gray-700 text-white rounded-bl-none"
                        }`}
                    >
                        {messageDetails.message}
                    </div>

                    <div className="text-[10px] text-gray-400 mt-1 text-right">
                        {messageDetails.createdAt &&
                            new Date(
                                messageDetails.createdAt
                            ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Message;