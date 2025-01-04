import { useParams } from "react-router-dom";
const Post = () => {
  const { id } = useParams();
  return (
    <div>
      post
      {id}
    </div>
  );
};
export default Post;
