import * as React from "react";
import {
  LoaderFunction,
  redirect,
  useLoaderData,
  useActionData,
  Form,
  useTransition,
  ActionFunction,
} from "remix";
import { ApiError, User } from "@supabase/supabase-js";
import { getUserByRequestToken, isAuthenticated } from "~/lib/auth";
import { supabase } from "~/lib/supabase/supabase.server";
import { supabaseClient } from "~/lib/supabase";
import Avatar from "~/lib/components/Base/avatar";
import FormInput from "~/lib/components/Base/form-input";
import { PATH } from "~/lib/constants/nav-constants";
import EditIcon from "~/lib/components/Icons/editIcon";
import UploadIcon from "~/lib/components/Icons/uploadIcon";
import Spinner from "~/lib/components/Base/spinner";

type Profile = {
  username?: string;
  website?: string;
  avatar_url?: string;
  authUpdateError?: ApiError | null;
  profileUpdateError?: ApiError | null;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { user } = await getUserByRequestToken(request);
  if (!(await isAuthenticated(request))) return redirect("/login");
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(`username, website, avatar_url`)
    .eq("id", params.id)
    .single();
  return { profile, user, error };
};

export const action: ActionFunction = async ({ request }) => {
  const { user } = await getUserByRequestToken(request);
  const form = await request.formData();
  const username = form.get("username");
  const website = form.get("website");
  const email = form.get("email")?.toString();
  const password = form.get("password")?.toString();
  const avatarUrl = form.get("avatar");

  const { error: authUpdateError } = await supabase.auth.update({
    ...(email && { email }),
    ...(password && { password }),
  });

  const { error: profileUpdateError } = await supabase.from("profiles").upsert({
    username,
    website,
    id: user.id,
    avatar_url: avatarUrl,
    updated_at: new Date(),
  });
  if (profileUpdateError || authUpdateError) {
    return { profileUpdateError, authUpdateError };
  }
  return redirect(PATH.PROFILE.VIEW);
};

export default function ProfileEdit() {
  const transition = useTransition();
  const { profile, user } = useLoaderData<{ profile: Profile; user?: User }>();
  const [isPasswordEdit, setIsPasswordEdit] = React.useState(false);
  const actionData = useActionData<Profile>();
  const authUpdateError = actionData?.authUpdateError;
  const profileUpdateError = actionData?.profileUpdateError;
  const [avatarUrl, setAvatarUrl] = React.useState<string>(
    profile?.avatar_url || ""
  );
  const avatarRef = React.useRef({} as HTMLInputElement);
  const [avatarLoading, setAvatarLoading] = React.useState<boolean>(false);

  async function handleFileChange(event: any) {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    setAvatarLoading(true);
    const resp = await supabaseClient.storage
      .from("avatars")
      .upload(filePath, file);
    if (resp?.error) {
      throw resp.error;
    }

    const downloadingImage = new Image();
    downloadingImage.onload = function () {
      setAvatarUrl(filePath);
      setAvatarLoading(false);
    };
    downloadingImage.src = `/images/avatars/${filePath}`;
  }

  return (
    <div className="flex justify-center">
      <div className="flex-column sm:flex justify-center gap-4 w-full md:w-3/4">
        <div className="px-4 sm:p-4 mt-4">
          {avatarUrl &&
            (avatarLoading ? <Spinner /> : <Avatar avatarUrl={avatarUrl} />)}
          <input
            ref={avatarRef}
            style={{ display: "none" }}
            type="file"
            id="avatar-upload"
            name="avatar-upload"
            accept="image/*"
            onChange={handleFileChange}
          />
          <UploadIcon
            customCss="h-6 w-6 p-1 stroke-cyan-800 cursor-pointer hover:bg-cyan-800 hover:stroke-cyan-50 rounded-full"
            onClick={() => avatarRef.current.click()}
          />
        </div>
        <div className="flex-column  flex-1 space-y-2">
          <Form method="post">
            <input
              // NOTE: adds url string to hidden field to submit string to db
              type="hidden"
              name="avatar"
              id="avatar-url-value"
              value={avatarUrl}
            />
            <div className="flex-column space-y-2 p-4">
              <FormInput
                defaultValue={profile?.username}
                isColorInverted
                label="Username"
                name="username"
                type="text"
              />
              <FormInput
                defaultValue={user?.email}
                isColorInverted
                label="Email"
                name="email"
                type="email"
              />
              <FormInput
                icon={
                  <EditIcon
                    customClass="h-6 w-6 stroke-cyan-800 cursor-pointer hover:bg-cyan-800 hover:stroke-cyan-50 rounded-full p-1"
                    onClick={() => setIsPasswordEdit(!isPasswordEdit)}
                  />
                }
                isColorInverted
                isDisabled={!isPasswordEdit}
                label="Password"
                name="password"
                type="password"
              />
              <FormInput
                defaultValue={profile?.website}
                isColorInverted
                label="Website"
                name="website"
                type="text"
              />
              <button
                className="btn rounded-sm bg-cyan-800 hover:bg-cyan-600 border-none"
                disabled={transition.state === "submitting"}
                type="submit"
              >
                Save Profile Changes
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
