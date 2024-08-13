export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialised.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    //strapi.server.httpServer is the new update for Strapi V4
    const io = require("socket.io")(strapi.server.httpServer, {
      cors: { // cors setup
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    io.on("connection", function (socket) { //Listening for a connection from the frontend
      socket.on("join", ({ username }) => { // Listening for a join connection
        console.log("user connected");
        console.log("username is ", username);
        if (username) {
          socket.join("thread"); // Adding the user to the thread
          socket.emit("welcome", { // Sending a welcome message to the User
            user: "bot",
            text: `${username}, Welcome!`,
            userData: username,
          });
        } else {
          console.log("An error occurred");
        }
      });
      socket.on("sendMessage", async (data) => { // Listening for a sendMessage connection
        let strapiData = { // Generating the message data to be stored in Strapi
          data: {
            user: data.user,
            message: data.message,
          },
        };
        const axios = require("axios");
        await axios
          .post("https://chat-backend-production-7ca1.up.railway.app/api/messages", strapiData, {headers: {"Authorization": `Bearer ${data.token}`}})//Storing the messages in Strapi
          .then((_e) => {
            socket.broadcast.to("thread").emit("message", {//Sending the message to the thread
              user: data.username,
              text: data.message,
            });
          })
          .catch((e) => console.log("error", e.message));
      });
    });
  },
};
