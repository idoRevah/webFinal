import PostTitleInput from "@/components/addPost/PostTitleInput";
import PostSubtitleInput from "@/components/addPost/PostSubtitleInput";
import CoverImageUploader from "@/components/addPost/CoverImageUploader";
import PostCategorySelector from "@/components/addPost/PostCatagorySelector";
import PostContentEditor from "@/components/addPost/PostContentEditor";
import ActionButtons from "@/components/addPost/ActionsButton";

export default function blog(): JSX.Element {
  return (
    <>
      <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
        <h1>Create New Post</h1>

        <PostTitleInput />
        <PostSubtitleInput />
        <CoverImageUploader />
        <PostCategorySelector />
        <PostContentEditor />
        <ActionButtons />
      </div>
    </>
  );
}
