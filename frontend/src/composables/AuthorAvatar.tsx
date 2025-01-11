import MuiAvatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

const getInitials = (fullName: string): string => {
  console.log(fullName);
  if (!fullName) return "AA";

  const names = fullName.trim().split(" ");
  return names.length === 1
    ? names[0][0].toUpperCase()
    : (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

const AuthorAvatar = ({ name }) => {
  return (
    <MuiAvatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24 }}>
      {getInitials(name)}
    </MuiAvatar>
  );
};

export { getInitials, AuthorAvatar };
