import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import apiRoutes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // JSON parser

// Routes
app.use("/api/v1", apiRoutes);

// Test route
app.post("/test", (req, res) => {
  console.log("req.body:", req.body);
  res.json({ received: req.body });
});

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
