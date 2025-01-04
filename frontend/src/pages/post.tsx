import { useParams } from "react-router-dom";
import { PostAuthor, PostImage, PostTitle } from "@/components/fullPost";
const Post = () => {
  const { id } = useParams();
  return (
    <div className="max-w-4xl mx-auto px-4">
      <PostTitle title="The Ultimate Guide to React with MUI and TailwindCSS" />
      <PostAuthor name="Jane Doe" date={new Date()} />
      <PostImage
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92BTIlcVMb8AfqxRmxHVd7svCo9KP9MIwAQ&s"
        altText="A beautiful image representing the post"
      />
    </div>
  );
};
export default Post;
