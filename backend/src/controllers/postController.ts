import { userInfo } from "os";
import Post from "../models/postModel";
import User from "../models/userModel";
export const createPost = async (req: any, res: any) => {
  try {
    const { title, content, subtitle, category } = req.body;
    const imageSrc = req.file
      ? `${process.env.URL}:${process.env.PORT}/uploads/${req.file.filename}`
      : "";
    const post = new Post({
      title,
      subtitle,
      content,
      imageSrc,
      category,
      user: req.user.id,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error("Can't add post with error:", err);
    res.status(400);
  }
};

export const getPosts = async (req: any, res: any) => {
  const posts = await Post.find().populate("user", "username");
  console.log(posts);
  const postsWithAuthor = posts.map((p) => ({
    ...p.toObject(),
    author: (p.user as any)?.username || "Unkown",
  }));
  res.json(postsWithAuthor);
};

export const getPostById = async (req: any, res: any) => {
  const post = await Post.findById(req.params.id).populate("user", "username");
  if (!post) return res.status(404).json({ message: "Post not found" });

  res.json({ ...post.toObject(), author: (post.user as any)?.username });
};

export const updatePost = async (req: any, res: any) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (!post.user || post.user.toString() !== req.user.toString()) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }
  const { title, content, subtitile, category } = req.body;
  post.title = title || post.title;
  post.content = content || post.content;
  post.subtitle = subtitile || post.subtitle;
  post.imageSrc = req.file
    ? `${process.env.URL}:${process.env.PORT}/uploads/${req.file.filename}`
    : post.imageSrc;
  post.category = category || post.category;
  await post.save();
  res.json(post);
};

export const deletePost = async (req: any, res: any) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  // if (!post.user || post.user.toString() !== req.user.id)
  // return res.status(403).json({ message: "Unauthorized" });
  await Post.deleteOne({ _id: req.params.id });
  res.json({ message: "Post deleted" });
};

export const likePost = async (req: any, res: any) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }
  post.likes.push(req.user);
  await post.save();
  res.json(post);
};
