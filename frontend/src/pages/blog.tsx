import BlogPost from "@/components/blogPosts/BlogPost";
import { BlogPostDataType } from "@/components/blogPosts/PostTypes";
import { useEffect, useState } from "react";
const postsss: Array<BlogPostDataType> = [
  {
    author: "Eden Gev Fadalon",
    date: new Date(),
    imgSrc:
      "https://miro.medium.com/v2/resize:fit:1400/1*TK4Kdj-cc890gQkgUtKNyA.png",
    id: "1",
    subject: "Tech",
    desc: "How We did some amazing tech with some computers and peoples wiwht some skills yes im typin oh yes shit bie",
    title: "Making Blog Is easy",
  },
  {
    author: "Eden Gev Fadalon",
    date: new Date(),
    imgSrc:
      "https://miro.medium.com/v2/resize:fit:1400/1*TK4Kdj-cc890gQkgUtKNyA.png",
    id: "1234",
    subject: "Tech",
    desc: "How We did some amazing tech with some computers and peoples wiwht some skills yes im typin oh yes shit bie",
    title: "Making Blog Is easy",
  },
  {
    author: "Eden Gev Fadalon",
    date: new Date(),
    imgSrc: "",
    id: "1422",
    subject: "Tech",
    desc: "How We did some amazing tech with some computers and peoples wiwht some skills yes im typin oh yes shit bie",
    title: "Making Blog Is easy",
  },
];
export default function blog(): JSX.Element {
  const [posts, setPosts] = useState<Array<BlogPostDataType>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsDataResponse = await fetch("http://localhost:3000/posts");
      const r = await postsDataResponse.json();
      setPosts(r);
    };
    fetchPosts();
  }, []);
  useEffect(() => console.log("posts", posts), [posts]);

  return (
    <>
      <div className="container mx-auto mt-8 w-[80vw]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPost
              key={post.id}
              createdAt={post.createdAt}
              id={post.id}
              category={post.category}
              subtitle={post.subtitle}
              title={post.title}
              author={post.author}
              imageSrc={post.imageSrc}
            />
          ))}
        </div>
      </div>
    </>
  );
}
