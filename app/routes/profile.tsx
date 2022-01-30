import * as React from "react";

interface ProfileProps {
  name: string;
}
const Profile: React.FC<ProfileProps> = ({ name }) => {
  return (
    <>
      <h1> hello Profile</h1>
    </>
  );
};

export default Profile;
