require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/posts", require("./routes/postRoutes"));

app.use("/api/comments", require("./routes/commentRoutes"));

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
