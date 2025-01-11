import React, { useState } from "react";
import { Button } from "@mui/material";

const CoverImageUploader: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Button variant="contained" component="label">
        Upload Cover Image
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>

      {image && <p>Selected Image: {image.name}</p>}
    </div>
  );
};

export default CoverImageUploader;
