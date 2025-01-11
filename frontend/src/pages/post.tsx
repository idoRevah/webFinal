import { useParams } from "react-router-dom";
import {
  PostAuthor,
  PostImage,
  PostTitle,
  PostBody,
} from "@/components/fullPost";
import CommentsSection from "@/components/fullPost/comments/CommentsSection";

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
      <PostBody
        content="
      Building Modern Web Applications with React
React is a powerful library for creating modern, interactive user interfaces. Developed by Facebook, React’s core revolves around a few key concepts:

Component-Based Architecture
At its heart, React uses components as the building blocks of its UI. Components are modular and reusable, allowing developers to create maintainable codebases. For example, a Button component can be reused across multiple parts of an application. This architecture promotes scalability and encourages a DRY (Don't Repeat Yourself) approach to development.

Virtual DOM for High Performance
React employs the Virtual DOM, a lightweight copy of the actual DOM. Instead of updating the entire DOM directly, React makes changes to the Virtual DOM and only updates the real DOM when necessary. This optimization boosts performance and ensures snappy interactions.

Declarative Syntax
React’s declarative approach allows developers to describe what the UI should look like for a given state, and React ensures that the actual UI matches this description. For instance:
    Building Modern Web Applications with React
React is a powerful library for creating modern, interactive user interfaces. Developed by Facebook, React’s core revolves around a few key concepts:

Component-Based Architecture
At its heart, React uses components as the building blocks of its UI. Components are modular and reusable, allowing developers to create maintainable codebases. For example, a Button component can be reused across multiple parts of an application. This architecture promotes scalability and encourages a DRY (Don't Repeat Yourself) approach to development.

Virtual DOM for High Performance
React employs the Virtual DOM, a lightweight copy of the actual DOM. Instead of updating the entire DOM directly, React makes changes to the Virtual DOM and only updates the real DOM when necessary. This optimization boosts performance and ensures snappy interactions.

Declarative Syntax
React’s declarative approach allows developers to describe what the UI should look like for a given state, and React ensures that the actual UI matches this description. For instance:
  "
      ></PostBody>
      <CommentsSection></CommentsSection>
    </div>
  );
};
export default Post;
