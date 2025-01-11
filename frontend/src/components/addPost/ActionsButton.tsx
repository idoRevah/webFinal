import React from "react";
import { Button, Stack } from "@mui/material";

const ActionButtons: React.FC = () => {
  const handlePublish = () => {
    alert("Post Published!");
  };

  const handleCancel = () => {
    alert("Canceled.");
  };

  return (
    <Stack direction="row" spacing={2} style={{ marginTop: "20px" }}>
      <Button variant="contained" color="primary" onClick={handlePublish}>
        Publish
      </Button>
      <Button variant="text" color="error" onClick={handleCancel}>
        Cancel
      </Button>
    </Stack>
  );
};

export default ActionButtons;
