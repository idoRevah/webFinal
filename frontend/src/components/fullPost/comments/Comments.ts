import { Comment } from "./CommentTypes";

const getPostComments = (postId: Number): Array<Comment> => {
  const postComments: Array<Comment> = [
    { id: 1, username: "JaneDoe", text: "Great post!", date: "Sep 10, 2025" },
    {
      id: 2,
      username: "John Smith",
      text: "Very helpful, thanks!",
      date: "Sep 11, 2025",
    },
  ];

  return postComments;
};

const saveNewComment = (postId: Number, comment: Comment) => {
  console.log(comment);
};

export { getPostComments, saveNewComment };
