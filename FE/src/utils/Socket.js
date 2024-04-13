import { io } from 'socket.io-client'

export const socket = io.connect(`${import.meta.env.VITE_BACKEND_URL}`);

socket.on("connect", () => {
    console.log("Connected to the Socket.io server");
});
