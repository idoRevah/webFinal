import Comment from '../models/commentModel';

export const createComment = async (req: any, res: any) => {
  try {
    const { content } = req.body;
    const comment = new Comment({
      content,
      userId: 1, // TODO: add user
      post: req.params.postId,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.error("Can't add comment with error:", err);
    res.status(400);
  }
  
};

export const getCommentsForPost = async (req: any, res: any) => {
  const comments = await Comment.find({ post: req.params.postId }).populate('user', 'username');
  res.json(comments);
};
