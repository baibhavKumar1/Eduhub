const { io } = require("socket.io-client");
const { connectRabbitMQ } = require("./rabbitmq");
//const channel = connectRabbitMQ()

//const socket = io.connect("http://localhost:3000");
const consumeCreateLecture = async () => {
    try {
        (await channel).assertQueue("create-lecture");
        (await channel).consume("create-lecture", async (message) => {
            try {
                const data = JSON.parse(message.content);
                //socket.emit("newLecture",data);
                //console.log(data);
                (await channel).ack(message);
            } catch (error) {
                console.error("Error processing message:", error);
            }
        });
    } catch (error) {
        console.error("Error connecting to RabbitMQ:", error);
    }
};
const consumeCreateAssignment = async () => {
    try {
        (await channel).assertQueue("create-assignment"); 
        (await channel).consume("create-assignment", async (message) => {
            try {
                const data = JSON.parse(message.content);
                console.log(data);
                // socket.emit("newAssignment",data);
                (await channel).ack(message);
            } catch (error) {
                console.error("Error processing message:", error);
            }
        });
    } catch (error) {
        console.error("Error connecting to RabbitMQ:", error);
    }
};

module.exports = {consumeCreateLecture,consumeCreateAssignment};