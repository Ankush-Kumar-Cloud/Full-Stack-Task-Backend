import express from "express";

const scrapeRoutes = express.Router();


scrapeRoutes.post("/scrape", async (req, res) => {
  await scrapeNews();
  res.json({ message: "Scraping completed" });
});

export default scrapeRoutes;