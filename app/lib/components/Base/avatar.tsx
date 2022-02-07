import * as React from "react";

interface AvatarProps {
  avatarUrl: string;
  customClass?: string;
}
const Avatar: React.FC<AvatarProps> = ({
  avatarUrl,
  customClass = "mb-8 rounded-full w-32 h-32",
}) => {
  return (
    <div className="avatar">
      <div className={customClass}>
        <img src={`/images/avatars/${avatarUrl}`} />
      </div>
    </div>
  );
};

export default Avatar;
