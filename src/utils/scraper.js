import axios from "axios";
import * as cheerio from "cheerio";
import Story from "../models/storyModel.js"



export const scrapeNews = async () => {
  try {
    const { data } = await axios.get("https://news.ycombinator.com/");
    const $ = cheerio.load(data);

    const stories = [];

    $(".athing").each((i, el) => {
      if (i >= 10) return false;

      const title = $(el).find(".titleline a").text();
      const url = $(el).find(".titleline a").attr("href");

      const subtext = $(el).next();

      const points = parseInt(subtext.find(".score").text()) || 0;
      const author = subtext.find(".hnuser").text();
      const postedAt = subtext.find(".age").text();

      stories.push({ title, url, points, author, postedAt });
    });

    await Story.deleteMany(); // clear old data
    await Story.insertMany(stories);

    console.log("Scraping done");
  } catch (error) {
    console.error("Scraper error:", error.message);
  }
};