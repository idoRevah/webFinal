import PostFooter from "@/components/blogPosts/PostFooter";
import PostDesc from "@/components/blogPosts/PostDesc";
import PostTitle from "@/components/blogPosts/PostTitle";
import { Box } from "@mui/material";

export default function blog(): JSX.Element {
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
            src="https://st.depositphotos.com/2001755/3622/i/450/depositphotos_36220949-stock-photo-beautiful-landscape.jpg" // Replace with your image URL
            alt="Blog Cover"
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
            <PostDesc desc="</Box>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum labore id officiis ex tenetur odio a rem doloremque doloribus perspiciatis debitis omnis quisquam amet repellendus eveniet, aspernatur odit nemo nulla?"></PostDesc>
            <PostFooter
              author="Eden Gver Fadalon"
              date={new Date()}
              subject="technology"
            ></PostFooter>
          </Box>
        </Box>
      </div>
    </>
  );
}
