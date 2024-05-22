// Remember to install pusher, if needed
// import Pusher from "pusher-js";
// import { postRequest } from "./http";

// Pusher.logToConsole = false;

// interface Channel {
//     name: string;
// }

// interface AuthorizationResponse {
//     auth: string;
// }

// interface ErrorResponse {
//     message: string;
// }

// const authorizer = (channel: Channel) => {
//     return {
//         authorize: (socketId: string, callback: (error: Error | null, data: AuthorizationResponse) => void) => {
//             postRequest({
//                 endpoint: "/authenticate/broadcast",
//                 payload: { socket_id: socketId, channel_name: channel.name },
//             })
//                 .then((res) => {
//                     callback(null, res.data);
//                 })
//                 .catch((err: ErrorResponse) => {
//                     callback(new Error(`Error calling auth endpoint: ${err.message}`), {
//                         auth: "",
//                     });
//                 });
//         },
//     };
// };

// export const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_KEY, {
//     cluster: "eu",
//     authorizer: authorizer,
// });

// export const exceptionChannel = pusher.subscribe("private-exception-channel");
