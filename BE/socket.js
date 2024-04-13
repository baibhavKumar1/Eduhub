const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    
    socket.on("newLecture", (data) => {
      io.emit("sendLecture", data);
    });
    socket.on("newAssignment", (data) => {
      io.emit("sendAssignment", data);
    });
    
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
module.exports= {app,io,server}