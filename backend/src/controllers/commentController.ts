import Comment from '../models/commentModel';

export const createComment = async (req: any, res: any) => {
  const { content } = req.body;
  const comment = new Comment({
    content,
    user: req.user.id,
    post: req.params.postId,
  });
  await comment.save();
  res.status(201).json(comment);
};

export const getCommentsForPost = async (req: any, res: any) => {
  const comments = await Comment.find({ post: req.params.postId }).populate('user', 'username');
  res.json(comments);
};
