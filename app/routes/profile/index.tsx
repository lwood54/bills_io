import * as React from "react";
import {
  LoaderFunction,
  redirect,
  useLoaderData,
  Link,
  useNavigate,
} from "remix";
import { User } from "@supabase/supabase-js";
import { isAuthenticated, getUserByRequestToken } from "~/lib/auth";
import { supabase } from "~/lib/supabase/supabase.server";
import { PATH } from "~/lib/constants/nav-constants";
import Avatar from "~/lib/components/Base/avatar";

type LoaderData = {
  user: User;
  username?: string;
  website?: string;
  avatar_url?: string;
  avatarBlob?: Blob | null;
};

export let loader: LoaderFunction = async ({ request }) => {
  if (!(await isAuthenticated(request))) return redirect(PATH.LOGIN);
  const { user } = await getUserByRequestToken(request);
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username, website, avatar_url")
    .eq("id", user.id)
    .single();
  return { ...profile, user, error };
};

export default function Profile() {
  const { avatar_url, username, user, website } = useLoaderData<LoaderData>();

  return (
    <div>
      {avatar_url && <Avatar avatarUrl={avatar_url} />}
      {/* <div className="avatar">
        <div className="mb-8 rounded-full w-32 h-32">
          <img src={`/images/avatars/${avatar_url}`} />
        </div>
      </div> */}
      <h3>Username</h3>
      {username}
      <h3>Email</h3>
      {user.email}
      {website ? (
        <a target="_blank" rel="noopener" href={website}>
          <p>{website}</p>
        </a>
      ) : (
        <p>Edit Profile to add a website.</p>
      )}
      <h3>Website</h3>
      <button>
        <Link to={PATH.PROFILE.EDIT.replace(":uuid", user?.id)}>
          Update Profile
        </Link>
      </button>
    </div>
  );
}
