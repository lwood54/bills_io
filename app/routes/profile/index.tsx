import { LoaderFunction, redirect, useLoaderData, Link } from "remix";
import { User } from "@supabase/supabase-js";
import { isAuthenticated, getUserByRequestToken } from "~/lib/auth";
import { supabase } from "~/lib/supabase/supabase.server";
import { PATH } from "~/lib/constants/nav-constants";
import Avatar from "~/lib/components/Base/avatar";
import { S_TEXT } from "~/lib/constants/styles";

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
    <div className="flex justify-center gap-4 w-full">
      <div className="p-4">
        {avatar_url && <Avatar avatarUrl={avatar_url} />}
      </div>
      <div className="flex-column space-y-2 p-4">
        <h3 className={S_TEXT.H3}>{username}</h3>
        <h3 className={S_TEXT.H3}>{user.email}</h3>
        {website ? (
          <h3 className={`${S_TEXT.H3} hover:bg-sky-100 hover:underline`}>
            <a target="_blank" rel="noopener" href={website}>
              {website}
            </a>
          </h3>
        ) : (
          <h3 className={S_TEXT.H3}>Edit Profile to add a website.</h3>
        )}
        <Link
          className="btn btn-sm rounded-sm bg-cyan-800 hover:bg-cyan-600 border-none"
          to={PATH.PROFILE.EDIT.replace(":uuid", user?.id)}
        >
          Update Profile
        </Link>
      </div>
    </div>
  );
}
