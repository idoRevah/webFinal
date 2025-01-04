import PostFooter from "@/components/blogPosts/PostFooter";
import PostDesc from "@/components/blogPosts/PostDesc";
import PostTitle from "@/components/blogPosts/PostTitle";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { BlogPostDataType } from "./PostTypes";

export default function BlogPost(BlogPostData: BlogPostDataType): JSX.Element {
  const navigate = useNavigate();

  const openFullPost = () => {
    navigate(`post/${BlogPostData.id}`);
  };

  return (
    <>
      <div>
        <Box
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            maxWidth: 400,
            margin: "auto",
            backgroundColor: "white",
          }}
        >
          {/* Image Section */}
          <Box
            component="img"
            className="w-90% h-52 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            src={BlogPostData.imgSrc}
            alt="Blog Cover"
            onClick={openFullPost}
            sx={{
              borderRadius: "12px",
              width: "100%",
              height: 200,
              objectFit: "cover",
            }}
          />

          {/* Content Section */}
          <Box
            sx={{
              paddingX: "5px",
              paddingY: "5px",
            }}
          >
            {/* Title */}
            <PostTitle title="How We Made A Blog"></PostTitle>
            <PostDesc desc={BlogPostData.desc}></PostDesc>
            <PostFooter
              author={BlogPostData.author}
              date={BlogPostData.date}
              subject={BlogPostData.subject}
            ></PostFooter>
          </Box>
        </Box>
      </div>
    </>
  );
}
