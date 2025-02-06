require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const userRouter = require("./routes/user.routes");
const homeRouter = require("./routes/home.routes");
const adminRouter = require("./routes/admin.routes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.json());

//connect db
connectToDB();

//users routes
app.use("/api/users/", userRouter);
app.use("/api/home/", homeRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
