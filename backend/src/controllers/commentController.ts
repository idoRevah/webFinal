import Comment from "../models/commentModel";

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
    const newComment = {
      content: comment.content,
      createdAt: comment.createdAt,
      author: "You (just now)"
    };
    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommentsForPost = async (req: any, res: any) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate(
      "user",
      "username"
    );
    const n = comments.map((c) => ({
      content: c.content,
      createdAt: c.createdAt,
      author: (c as any).user?.username,
    }));
    res.json(n);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
