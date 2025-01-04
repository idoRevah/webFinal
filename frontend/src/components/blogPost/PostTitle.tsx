import { Typography } from "@mui/material";

export default function PostTitle({ title }) {
  return (
    <div>
      {" "}
      <Typography
        variant="h6"
        clasName="relative inline-block font-bold text-lg mb-2 text-black before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-1 before:bg-purple-300 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 group-hover:before:scale-x-100"
        sx={{
          display: "inline-block", // Ensures the underline adjusts to the text width
          position: "relative",
          fontWeight: "bold",
          color: "black",
          lineHeight: 1.2, // Ensure proper spacing between lines
          textAlign: "left",
        }}
      >
        {title}
      </Typography>
    </div>
  );
}
