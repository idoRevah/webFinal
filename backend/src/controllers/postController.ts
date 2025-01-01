import Post from '../models/postModel';

export const createPost = async (req: any, res: any) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : null;
  const post = new Post({
    title,
    content,
    image,
    user: req.user.id,
  });
  await post.save();
  res.status(201).json(post);
};

export const getPosts = async (req: any, res: any) => {
  const posts = await Post.find().populate('user', 'username');
  res.json(posts);
};

export const updatePost = async (req: any, res: any) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (!post.user || post.user.toString() !== req.user.id)
    return res.status(403).json({ message: 'Unauthorized' });

  const { title, content } = req.body;
  post.title = title || post.title;
  post.content = content || post.content;
  post.image = req.file ? req.file.filename : post.image;
  await post.save();
  res.json(post);
};

export const deletePost = async (req: any, res: any) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (!post.user || post.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });
    await Post.deleteOne({ _id: req.params.id });
    res.json({ message: 'Post deleted' });
  };
  

export const likePost = async (req: any, res: any) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  post.likes += 1;
  await post.save();
  res.json(post);
};