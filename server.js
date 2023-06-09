import express from "express";
import { APP_PORT, MONGO_ATLAS_URL } from "./config/index.js";
const app = express();
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import mongoose from "mongoose";
import cors from "cors";
app.use(cors());
// app.use(express.json())
app.use(express.json({ limit: '50mb', extended: true }))
// app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use('/image', express.static('image'));
app.use("/api", routes);
app.get("/", (req, res) => res.send("Raj bahai done backend deply thai gyu"))
mongoose.connect(MONGO_ATLAS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Mongoose is connected :>>>🤘😎🤘");
});

app.use(errorHandler);
app.listen(APP_PORT, () => console.log(`server is running on port ::> ${APP_PORT} 🚀❤️‍🔥🚀`));
