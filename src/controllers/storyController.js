import Story from "../models/storyModel.js"
import User from "../models/userModel.js"

export const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ points: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stories" });
  }
};

export const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: "Error fetching story" });
  }
};






//Bookmark

export const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const storyId = req.params.id;

    const isBookmarked = user.bookmarks.includes(storyId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== storyId
      );
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();

    res.json({ bookmarks: user.bookmarks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bookmark error" });
  }
};



//getBook mark

export const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("bookmarks");

    res.json(user.bookmarks);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookmarks",
    });
  }
};