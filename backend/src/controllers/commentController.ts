import Comment from '../models/commentModel';

export const createComment = async (req: any, res: any) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const comment = new Comment({
      content,
      user: req.user,
      post: req.params.postId,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommentsForPost = async (req: any, res: any) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('user');

    if (!comments.length) {
      return res.status(404).json({ message: "No comments found for this post" });
    }

    res.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
