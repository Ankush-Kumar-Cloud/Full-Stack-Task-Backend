import { getBookmarks, getStories, getStoryById, toggleBookmark } from "../controllers/storyController.js";
import express from "express"
import { protect } from "../middleware/authMiddleware.js";

const storyRoutes = express.Router();

storyRoutes.get("/stories", getStories);
storyRoutes.get("/stories/:id", getStoryById);





storyRoutes.post("/stories/:id/bookmark", protect, toggleBookmark);



storyRoutes.get(  "/bookmarks",  protect,  getBookmarks);

export default storyRoutes;