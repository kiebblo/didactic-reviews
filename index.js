require("dotenv").config();
require("./config/db");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const UserRoute = require("./route/UserRoute");
const ReviewRoute = require("./route/ReviewRoute")
app.use("/user", UserRoute);
app.use("/reviews", ReviewRoute)


app.listen(process.env.PORT, () => console.log(`THe server is running on port ${process.env.PORT}`));