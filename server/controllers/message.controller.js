// // import Message from '../models/message.model.js'
// // import Conversation from '../models/conversation.model.js'
// // import { asyncHandler } from '../utilities/asyncHandler.utility.js'
// // import { errorHandler } from '../utilities/errorHandler.utility.js'
// // import {io, getSocketId} from '../socket/socket.js'

// // export const sendMessage = asyncHandler(async(req, res, next) => {
    
// //     const senderId = req.user._id;
// //     const receiverId = req.params.receiverId;
// //     const message = req.body.message;

// //     if (!senderId || !receiverId || !message){
// //         return next(new errorHandler("All fields are required", 400));
// //     }

// //     let conversation = await Conversation.findOne({
// //         participants: { $all: [senderId, receiverId] },
// //     });

// //     if (!conversation){
// //         conversation = await Conversation.create({
// //             participants: [senderId, receiverId],
// //         })
// //     }

// //     const newMessage = await Message.create({
// //         senderId,
// //         receiverId,
// //         message,
// //     });

// //     if (newMessage){
// //         conversation.messages.push(newMessage._id);
// //         await conversation.save();
// //     }

// //     // societ.io
// //     const socketId = getSocketId(receiverId);
// //     io.to(socketId).emit("newMessage", newMessage);


// //     res
// //     .status(200)
// //     .json({
// //         success: true,
// //         responseData: newMessage,
// //     });

// // });

// // export const getMessages = asyncHandler(async(req, res, next) => {
    
// //     const myId = req.user._id;
// //     const otherParticipantId = req.params.otherParticipantId;

// //     if (!myId || !otherParticipantId){
// //         return next(new errorHandler("All fields are required", 400));
// //     }

// //     let conversations = await Conversation.findOne({
// //         participants: { $all: [myId, otherParticipantId] },
// //     }).populate("messages");


// //     res
// //     .status(200)
// //     .json({
// //         success: true,
// //         responseData: conversations,
// //     });

// // });




// import asyncHandler from "../../utils/asyncHandler.js";
// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../../socket/socket.js";


// // SEND MESSAGE
// export const sendMessage = asyncHandler(async (req, res) => {

//     const senderId = req.user._id;
//     const { receiverId } = req.params;
//     const { message } = req.body;

//     // Find conversation
//     let conversation = await Conversation.findOne({
//         participants: { $all: [senderId, receiverId] },
//     });

//     // Create conversation if not exists
//     if (!conversation) {
//         conversation = await Conversation.create({
//             participants: [senderId, receiverId],
//             messages: [],
//         });
//     }

//     // Create message
//     const newMessage = await Message.create({
//         senderId,
//         receiverId,
//         message,
//     });

//     // Push message into conversation
//     conversation.messages.push(newMessage._id);
//     await conversation.save();

//     // Populate senderId (VERY IMPORTANT)
//     const populatedMessage = await Message.findById(
//         newMessage._id
//     );

//     // Send via socket
//     const receiverSocketId =
//         getReceiverSocketId(receiverId);

//     if (receiverSocketId) {
//         io.to(receiverSocketId).emit(
//             "newMessage",
//             populatedMessage
//         );
//     }

//     res.status(200).json({
//         success: true,
//         responseData: populatedMessage,
//     });

// });



// // GET MESSAGES
// export const getMessages = asyncHandler(async (req, res) => {

//     const myId = req.user._id;
//     const { receiverId } = req.params;

//     let conversation = await Conversation.findOne({
//         participants: { $all: [myId, receiverId] },
//     }).populate("messages");

//     res.status(200).json({
//         success: true,
//         responseData:
//             conversation?.messages || [], // ✅ FIX
//     });

// });


import Message from '../models/message.model.js'
import Conversation from '../models/conversation.model.js'
import { asyncHandler } from '../utilities/asyncHandler.utility.js'
import { errorHandler } from '../utilities/errorHandler.utility.js'
import {io, getSocketId} from '../socket/socket.js'


// ==============================
// SEND MESSAGE
// ==============================

export const sendMessage = asyncHandler(async (req, res) => {

    try {

        const senderId = req.user._id;
        const { receiverId } = req.params;
        const { message } = req.body;

        // Find existing conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // Create conversation if not exists
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [],
            });
        }

        // Create message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        });

        // Push message into conversation
        conversation.messages.push(newMessage._id);

        await conversation.save();

        // Populate message
        const populatedMessage =
            await Message.findById(newMessage._id);

        // Send message via socket
        const receiverSocketId =
            getReceiverSocketId(receiverId);

        if (receiverSocketId) {

            io.to(receiverSocketId).emit(
                "newMessage",
                populatedMessage
            );

        }

        res.status(200).json({
            success: true,
            responseData: populatedMessage,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error sending message",
        });

    }

});



// ==============================
// GET MESSAGES
// ==============================

export const getMessages = asyncHandler(async (req, res) => {

    try {

        const myId = req.user._id;
        const { receiverId } = req.params;

        let conversation =
            await Conversation.findOne({
                participants: { $all: [myId, receiverId] },
            }).populate("messages");

        res.status(200).json({
            success: true,

            // ✅ VERY IMPORTANT FIX
            responseData:
                conversation?.messages || [],

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error fetching messages",
        });

    }

});