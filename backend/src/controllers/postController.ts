import { userInfo } from "os";
import Post from "../models/postModel";
import User from "../models/userModel";

export const createPost = async (req: any, res: any) => {
  try {
    const { title, content, subtitle, category } = req.body;
    const imageSrc = req.file
      ? `${process.env.URL}:${process.env.PORT}/uploads/${req.file.filename}`
      : "test";
    const post = new Post({
      title,
      subtitle,
      content,
      imageSrc,
      category,
      user: req.user,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPosts = async (req: any, res: any) => {
  try {
    const posts = await Post.find().populate("user", "username");
    const postsWithAuthor = posts.map((p) => ({
      ...p.toObject(),
      author: (p.user as any)?.username || "Unkown",
    }));
    res.json(postsWithAuthor);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "username"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json({ ...post.toObject(), author: (post.user as any)?.username });
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (!post.user || post.user.toString() !== req.user.id) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    const { title, content, subtitle, category } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;
    post.subtitle = subtitle || post.subtitle;
    post.imageSrc = req.file
      ? `${process.env.URL}:${process.env.PORT}/uploads/${req.file.filename}`
      : post.imageSrc;
    post.category = category || post.category;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (!post.user || post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Post.deleteOne({ _id: req.params.id });
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const likePost = async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (!post.likes.includes(req.user.id)) { // make sure the id's are the same obj
      post.likes.push(req.user.id);
      await post.save();
    }

    res.json(post);
  } catch (err) {
    console.error("Error liking post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unlikePost = async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter((userId) => userId.toString() !== req.user.id); // Remove user from array
      await post.save();
    }

    res.json(post);
  } catch (err) {
    console.error("Error unliking post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
