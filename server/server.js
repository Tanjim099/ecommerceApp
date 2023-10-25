import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors"


//configure env
dotenv.config();


//db config
connectDB()

//rest object
const app = express();

//middelwares
const corsOptions = {
    origin: 'http://127.0.0.1:5173/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and HTTP authentication to be sent cross-origin
    optionsSuccessStatus: 204, // Some legacy browsers (IE11) choke on 204
};
app.use(cors(corsOptions));
// app.use(cors)
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes)

//rest api
app.get("/", (req, res) => {
    res.send({
        message: "welcome to ecommerce app"
    })
})

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`.bgCyan.white)
})