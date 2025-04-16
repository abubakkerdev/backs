const userModel = require("../models/user");

const allSocketConnection = (io, socket) => {
  // console.log("New Client Join");

  socket.join("message-room");
  socket.emit("connected", "Socket.io connection established.");

  // socket.on("reqAllMessages", async (data) => {
  //   if (data.role === "student") {
  //     const message = await messageModel.find({ studentId: data.id });
  //     io.to("message-room").emit("resAllMessages", message);
  //   } else if (data.role === "teacher") {
  //     const message = await messageModel.find({ teacherId: data.id });
  //     io.to("message-room").emit("resAllMessages", message);
  //   }
  // });

  // socket.on("studentRemoved", (data) => {
  //   io.to("message-room").emit("removedStudent", data.id);
  // });

  // socket.on("feedbackShow", (data) => {
  //   io.to("message-room").emit("showFeedback", data);
  // });

  // socket.on("messageImageRander", (data) => {
  //   io.to("message-room").emit("imageRanderMessage", data);
  // });

  // socket.on("limitCount", (data) => {
  //   io.to("message-room").emit("countLimit", data);
  // });

  socket.on("disconnect", () => {
    console.log("Client disconnected.");
  });
};

module.exports = allSocketConnection;
