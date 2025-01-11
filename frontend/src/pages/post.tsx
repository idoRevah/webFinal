import { useParams } from "react-router-dom";
import {
  PostAuthor,
  PostImage,
  PostTitle,
  PostBody,
} from "@/components/fullPost";
import CommentsSection from "@/components/fullPost/comments/CommentsSection";
import { useEffect, useState } from "react";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>({});

  useEffect(() => {
    const fetchPost = async () => {
      const postResponse = await fetch(`http://localhost:3000/posts/${id}`);
      const post = await postResponse.json();

      setPost(post);
    };

    fetchPost();
  }, []);

  useEffect(() => {
    console.log(post);
  }, [post]);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <PostTitle title={post.title} />
      <PostAuthor name={post.author} date={new Date(post.createdAt)} />
      <PostImage
        imageUrl={post.imageSrc}
        altText="A beautiful image representing the post"
      />
      <PostBody content={post.content}></PostBody>
      <CommentsSection></CommentsSection>
    </div>
  );
};
export default Post;
