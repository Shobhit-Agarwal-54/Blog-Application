import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBlogs,
  getBlogs,
  updateBlog,
  deleteBlog,
  getBlog
} from "../controllers/blogControllers.js";

const router = express.Router();

router.get("/", protect, getBlogs);
router.get("/:id",protect,getBlog)
router.post("/", protect, createBlogs);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
