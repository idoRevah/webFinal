import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { AuthorAvatar } from "@/composables/AuthorAvatar";
import { Comment } from "./CommentTypes";
import { dateToPostString } from "@/composables/dateFormatters";
import { getPostComments, saveNewComment } from "./comments";
import { useParams } from "react-router-dom";

const CommentsSection: React.FC = () => {
  const { id: postId } = useParams();

  const [comments, setComments] = useState<Array<Comment>>([]);
  useEffect((): void => {
    setComments(getPostComments(Number(postId)));
  }, []);

  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      username: "GuestUser", // Replace with actual user if available
      text: newComment,
      date: dateToPostString(new Date()),
    };

    setComments([comment, ...comments]);
    saveNewComment(Number(postId), comment);
    setNewComment("");
  };

  return (
    <Box sx={{ maxWidth: "800px", margin: "auto" }}>
      {/* Comments Title */}
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Comments
      </Typography>

      {/* Comment Input */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Add a comment..."
          multiline
          rows={3}
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleAddComment}
          sx={{ alignSelf: "flex-end" }}
        >
          Post Comment
        </Button>
      </Box>

      <Divider sx={{ marginY: 3 }} />

      {/* Comments List */}
      {comments.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No comments yet. Be the first to comment!
        </Typography>
      ) : (
        comments.map((comment) => (
          <Box
            key={comment.id}
            sx={{ display: "flex", alignItems: "flex-start", marginBottom: 3 }}
          >
            <AuthorAvatar name={comment.username}></AuthorAvatar>
            <Divider sx={{ marginX: 1 }}></Divider>
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                {comment.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {comment.date}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {comment.text}
              </Typography>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default CommentsSection;
