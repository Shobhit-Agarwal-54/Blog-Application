import Blog from "../models/Blog.js";
import { findUserById } from "../repository/user.js";
import { createBlog, filterBlogs, findBlogById } from "../repository/blog.js";

export const createBlogs = async (req, res) => {
  try {
    const { title, category, content, image } = req.body;
  
    const user=await findUserById(req.user.id);
    console.log(req.user.id);
    const blog = await createBlog({
      title,
      category,
      content,
      image,
      author: user.name,
      userId: user._id
    });
  
   return res.status(201).json({
      message:"Blog Created Successfully",
      success:true,
      blog
  });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      message:"Error in creating blog"
    })
  }
};


export const getBlogs = async (req, res) => {
  const { category, author } = req.query;

  let filter = {};
  if (category) filter.category = category;
  if (author) filter.author = author;

  const blogs = await filterBlogs(filter);
  return res.status(200).json({
    success:true,
    message:"Fetched all relevant blogs",
    blogs,
  });
};
export const getBlog=async (req,res)=>{
  const blog = await findBlogById(req.params.id);
        if (!blog)
      return res.status(404).json({
    message: "Blog not found",
    success:false
    
    });
 return res.status(201).json({
    message:"Blog fetched successfully",
    blog,
    success:true
 });
}

// UPDATE
export const updateBlog = async (req, res) => {
  const blog = await findBlogById(req.params.id);

  if (!blog)
  return res.status(404).json({
 message: "Blog not found",
 success:false
});

  if (blog.userId.toString() !== req.user.id) {
    return res.status(403).json({ 
        message: "Not authorized to update the blog",
        success:false
    });
  }

  Object.assign(blog, req.body);
  await blog.save();

 return res.status(201).json({
    message:"Blog updated successfully",
    blog,
    success:true
 });
};


export const deleteBlog = async (req, res) => {
 const blog = await findBlogById(req.params.id);

  if (!blog) 
    return res.status(404).json({ 
    message: "Blog not found",
    success:false
   });

  if (blog.userId.toString() !== req.user.id) {
    return res.status(403).json({ 
    message: "Not authorized to delete the blog",
    success:false
});
  }

  await blog.deleteOne();
  return res.status(200).json({
     message: "Blog deleted successfully",
     success:true
    });
};
