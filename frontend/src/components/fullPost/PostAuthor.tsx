import React from "react";
import { Typography } from "@mui/material";
import { AuthorAvatar } from "@/composables/AuthorAvatar";
import { dateToPostString } from "@/composables/dateFormatters";
interface AuthorInfoProps {
  name: string;
  date: Date;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ name, date }) => {
  return (
    <div className="flex items-center gap-4 my-4">
      <AuthorAvatar name={name} />
      <div>
        <Typography variant="subtitle1" className="font-medium text-gray-900">
          {name}
        </Typography>
        <Typography variant="body2" className="text-gray-500">
          {dateToPostString(date)}
        </Typography>
      </div>
    </div>
  );
};

export default AuthorInfo;
