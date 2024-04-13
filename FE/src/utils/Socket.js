import { io } from 'socket.io-client'

export const socket = io.connect("http://localhost:3000");

socket.on("connect", () => {
    console.log("Connected to the Socket.io server");
});
