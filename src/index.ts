import express from "express"
import http from "http"
import cookieparser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import 'dotenv/config'
import mongoose from "mongoose"
import router from "./routes/authRoutes"

const app = express();

app.use(cors({
    credentials : true
}));

app.use(compression());

app.use(cookieparser());

app.use(express.json());

const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port , ()=>{
    console.log('Server Running on http://localhost:8080');
})

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.use('/' , router)