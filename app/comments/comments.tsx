"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { Comment as IComment } from "../posts/interfaces/post.interface";
import Comment from "./comment";

interface CommentProps {
  comments: IComment[];
}

const boxStyles = {
  border: 1,
  borderColor: "divider",
  borderRadius: 2,
  p: 2,
  mb: 2,
  mt: 2,
};

export default function Comments({ comments }: CommentProps) {
  if (!comments?.length) {
    return (
      <Box sx={boxStyles}>
        <Typography variant="body2" color="text.secondary">
          No comments yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={boxStyles}>
      {comments.map(({ id, author, content, createdAt, avatarUrl }) => (
        <Comment
          key={id}
          author={author}
          content={content}
          date={createdAt || ""}
          avatarUrl={avatarUrl}
        />
      ))}
    </Box>
  );
}
