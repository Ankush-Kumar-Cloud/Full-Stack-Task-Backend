import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { scrapeNews } from "./src/utils/scraper.js";
import connectDB from "./src/config/db.js";

import scrapeRoutes from "./src/routers/srcapeRoute.js";
import storyRoutes from "./src/routers/storyRouter.js";
import authRoutes from "./src/routers/authRoutes.js";




dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();


// routes (we’ll add later)
app.get("/", (req, res) => {
  res.send("API running...");
});


app.use("/api", scrapeRoutes);

app.use("/api", storyRoutes);

app.use("/api", authRoutes)




const PORT = process.env.PORT || 5000;



app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await scrapeNews(); // auto run
});