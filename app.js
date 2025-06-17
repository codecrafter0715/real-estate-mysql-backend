const express =require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
require('./config/db')


const userRoute = require("./routes/userRoutes");
const propertyRoute = require("./routes/propertyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Estate App Backend Running"));
app.use("/api/user", userRoute);
app.use("/api/property", propertyRoute);

app.use('/uploads',express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
