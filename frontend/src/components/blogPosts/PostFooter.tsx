import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { PostFooterData } from "./PostTypes";
import { AuthorAvatar } from "@/composables/AuthorAvatar";
import { dateToPostString } from "@/composables/dateFormatters";

export default function PostFooter(footerData: PostFooterData) {
  return (
    <>
      <div className="flex flex-row items-center justify-between pt-2 text-gray-500">
        <AuthorAvatar name={footerData.author}></AuthorAvatar>
        <Divider orientation="vertical" variant="middle" flexItem />
        {footerData.author}
        <Divider orientation="vertical" variant="middle" flexItem />
        {dateToPostString(new Date(footerData.date))}
        <Divider orientation="vertical" variant="middle" flexItem />
        <Chip
          label={footerData.subject}
          sx={{
            backgroundColor: "#f5ebff", // Light purple background
            color: "#6a1b9a",
          }}
        />
      </div>
    </>
  );
}
