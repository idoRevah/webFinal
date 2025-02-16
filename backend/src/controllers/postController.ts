import Post from "../models/postModel";

export const createPost = async (req: any, res: any) => {
  try {
    const { title, content, subtitle, category } = req.body;
    const imageSrc = req.file ? `${process.env.URL}:${process.env.PORT}/uploads/${req.file.filename}` : '';

    const post = new Post({
      title,
      subtitle,
      content,
      imageSrc,
      category,
      user: req.user
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
    const posts = await Post.find().populate("user");
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (!post.user || post.user.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { title, content, subtitle, category } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;
    post.subtitle = subtitle || post.subtitle;
    post.imageSrc = req.file ? `${process.env.URL}:${process.env.PORT}/uploads/${req.file.filename}` : post.imageSrc;
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

    if (!post.user || post.user.toString() !== req.user) {
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

    if (!post.likes.includes(req.user)) {
      post.likes.push(req.user);
      await post.save();
    }

    res.json(post);
  } catch (err) {
    console.error("Error liking post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
