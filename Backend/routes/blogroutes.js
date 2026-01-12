import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog
} from "../controllers/blogControllers.js";

const router = express.Router();

router.get("/", protect, getBlogs);
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
