const { setFlagsFromString } = require("v8");
const app = require("./app");
const dev = require("./config/config");
const Leads = require("./models/leads.model");
const PORT = dev.app.port;
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

//Add this before the app.get() block
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("message", async (data) => {
    const lead = await Leads.findOne({
      id: data.id,
    });
    console.log(lead);
    lead.followerID = data.user_id;
    lead.followerName = data.name;
    await lead.save();
  });
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

http.listen(PORT, () => {
  console.log(`server is running at port http://localhost:${PORT}`);
});
