import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { PostFooterData } from "./PostTypes";

const getInitials = (fullName: string): string => {
  const names = fullName.trim().split(" ");
  return names.length === 1
    ? names[0][0].toUpperCase()
    : (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

const getStringDate = (date: Date): string => {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export default function PostFooter(footerData: PostFooterData) {
  return (
    <>
      <div className="flex flex-row items-center justify-between pt-2 text-gray-500">
        <Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24 }}>
          {getInitials(footerData.author)}
        </Avatar>
        <Divider orientation="vertical" variant="middle" flexItem />
        {footerData.author}
        <Divider orientation="vertical" variant="middle" flexItem />
        {getStringDate(footerData.date)}
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
