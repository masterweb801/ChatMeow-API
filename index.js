const compression = require('compression')
const express = require('express');
const connectToMongo = require("./db");

connectToMongo();

const app = express();
const port = 5000;
app.use(express.json({ limit: '5mb' }));
app.use(compression());

// Authentication
app.use("/api/signup", require("./routes/Auth/signup"));
app.use("/api/login", require("./routes/Auth/login"));

// Users
app.use("/api/getUser", require("./routes/Users/getUser"));
app.use("/api/allUser", require("./routes/Users/allUsers"));

// Posts
app.use("/api/post", require("./routes/Posts/newPost"));
app.use("/api/usrPost", require("./routes/Posts/postsOU"));
app.use("/api/likePost", require("./routes/Posts/likePost"));
app.use("/api/allPosts", require("./routes/Posts/allPosts"));
app.use("/api/delPost", require("./routes/Posts/delPost"));

// Chat
app.use("/api/newChat", require("./routes/Chat/newChat"));
app.use("/api/allChat", require("./routes/Chat/allChat"));

app.listen(port, () => {
    console.log(`ChatMeow server listening on port ${port}`)
})
