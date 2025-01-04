import BlogPost from "@/components/blogPosts/BlogPost";
const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export default function blog(): JSX.Element {
  return (
    <>
      <div className="container mx-auto mt-8 w-[80vw]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPost key={post} />
          ))}
        </div>
      </div>
    </>
  );
}
