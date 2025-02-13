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
      userId: 1, // TODO: add user
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error("Can't add post with error:", err);
    res.status(400);
  }
};

export const getPosts = async (req: any, res: any) => {
  // TODO: after implementing users logic
  // const posts = await Post.find().populate("user", "username");
  const posts = await Post.find();

  // TODO: remove next line and return posts
  const postsWithAuthor = posts.map((p) => ({
    ...p.toObject(),
    author: "Ido Revah",
  }));
  res.json(postsWithAuthor);
};

export const getPostById = async (req: any, res: any) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  // Todo: populate user
  res.json({ ...post.toObject(), author: "Ido Revah" });
};

export const updatePost = async (req: any, res: any) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  // if (!post.user || post.user.toString() !== req.user.id) {
  //   res.status(403).json({ message: "Unauthorized" });
  //   return;
  // }
  const { title, content, subtitile, category } = req.body;
  post.title = title || post.title;
  post.content = content || post.content;
  post.subtitle = subtitile || post.subtitle;
  post.imageSrc = req.file ? `${process.env.URL}:${process.env.PORT}/uploads/${req.file.filename}` : post.imageSrc;
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
  post.likes += 1;
  await post.save();
  res.json(post);
};
