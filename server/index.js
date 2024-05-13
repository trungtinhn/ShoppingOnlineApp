const express = require("express")

const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cokieParser = require("cookie-parser")
const categoryRoutes = require("./routes/routeCategory")

dotenv.config()
const app = express()
mongoose.connect(process.env.MONGODB_URL.replace("<password>", process.env.MONGODB_PASSWORD)).then(() => {
    console.log("Database connected");
})


app.use(cors())
app.use(express.json())
app.use(cokieParser())


app.use("/v1/category", categoryRoutes)

app.listen(8000, () => {
    console.log("Server running on port 8000");
});
    



