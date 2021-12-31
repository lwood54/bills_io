import * as React from "react";
import { Avatar } from "../../components/avatar";
import Text from "../../components/Base/Text/text";
import EditIcon from "../../components/Icons/edit-icon";
import { useAuth } from "../../contexts/Auth";
import { supabase } from "../../supabase";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [avatar_url, setAvatar_url] = React.useState("");

  async function getProfile() {
    try {
      setIsLoading(true);
      console.log("user", user);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      console.log("data", data);
      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatar_url(data.avatar_url);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    getProfile();
  }, []);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setIsLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user?.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log("error updating profile", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Text as="h2">stuff here</Text>
          <EditIcon onClick={(e) => console.log(e)} />
          <h1>Profile</h1>
          <h3>Email:</h3>
          <h4>{user?.email}</h4>
          <hr />
          <h3>Username:</h3>
          <h4>{username}</h4>
          <Avatar
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatar_url(url);
              updateProfile({ username, website, avatar_url: url });
            }}
          />
        </>
      )}
    </>
  );
};

export default Profile;
