require("dotenv").config();
require("./config/db");
const express = require("express");
const app =  express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const RouteUser = require("./route/UserRoute");
app.use("/user", RouteUser);


app.listen(process.env.PORT, () => console.log(`THe server is running on port ${process.env.PORT}`));