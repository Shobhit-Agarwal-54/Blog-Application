import Blog from "../models/Blog.js";

export async function filterBlogs(filter)
{
    try {
         const blogs = await Blog.find(filter).sort({ createdAt: -1 });
         return blogs;
    } catch (error) {
        console.log("Error in filterBlogs() in the repository layer",error);
        throw error;
    }
}

export async function createBlog({title,category,content,image,author,userId})
{
    try {
        const blog = await Blog.create({
          title,
          category,
          content,
          image,
          author,
          userId
        });
        
    } catch (error) {
        console.log("Error in createBlog () in the repository layer",error);
        throw error;
    }
}

export async function findBlogById(id)
{
    try {
       const blog= await Blog.findById(id);
        return blog;
    } catch (error) {
        console.log("Error in findBlogById () in the repository layer",error);
        throw error;
    }
}