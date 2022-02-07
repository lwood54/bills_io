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
import { User } from "@supabase/supabase-js";
import { getUserByRequestToken, isAuthenticated } from "~/lib/auth";
import { supabase } from "~/lib/supabase/supabase.server";
import { supabaseClient } from "~/lib/supabase";
import Avatar from "~/lib/components/Base/avatar";

type Profile = {
  username?: string;
  website?: string;
  avatar_url?: string;
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
  const avatarUrl = form.get("avatar");

  const { error } = await supabase.from("profiles").upsert({
    username,
    website,
    id: user.id,
    avatar_url: avatarUrl,
    updated_at: new Date(),
  });
  if (error) {
    return { error };
  }
  return redirect("/profile");
};

export default function ProfileEdit() {
  const transition = useTransition();
  const { profile, user } = useLoaderData<{ profile: Profile; user?: User }>();
  const errors = useActionData<Profile>();
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
    <div>
      Avatar Url
      {avatarUrl}
      {avatarUrl && <Avatar avatarUrl={avatarUrl} />}
      Username:
      {profile?.username}
    </div>
    // <Container p="4">
    //   <Stack spacing={4} justifyContent="center">
    //     <HStack spacing={4}>
    //       <VStack alignItems="flex-start" width="150px">
    //         <Avatar src={`/images/avatars/${avatarUrl}`} size="2xl" />
    //         <input
    //           ref={avatarRef}
    //           style={{ display: 'none' }}
    //           type="file"
    //           id="avatar-upload"
    //           name="avatar-upload"
    //           accept="image/*"
    //           onChange={handleFileChange}
    //         />
    //         <IconButton
    //           isRound
    //           variant="outline"
    //           colorScheme="teal"
    //           aria-label="change avatar"
    //           fontSize="20px"
    //           onClick={() => avatarRef.current.click()}
    //           icon={<EditIcon />}
    //         />
    //       </VStack>
    //       <VStack width="100%" alignItems="flex-start">
    //         <Form method="post" style={{ width: '100%' }}>
    //           <input
    //             // NOTE: adds url string to hidden field to submit string to db
    //             type="hidden"
    //             name="avatar"
    //             id="avatar-url-value"
    //             value={avatarUrl}
    //           />
    //           <VStack alignItems="flex-start" width="100%">
    //             <Text>Username</Text>
    //             <Input
    //               id="username"
    //               name="username"
    //               type="text"
    //               required
    //               defaultValue={profile?.username}
    //             />
    //             {errors?.username && (
    //               <Text border="1px solid red" color="red.500">
    //                 {errors.username}
    //               </Text>
    //             )}
    //             <Text>Website</Text>
    //             <Input
    //               id="website"
    //               name="website"
    //               type="text"
    //               required
    //               defaultValue={profile?.website}
    //             />
    //             {errors?.website && (
    //               <Text border="1px solid red" color="red.500">
    //                 {errors.website}
    //               </Text>
    //             )}
    //             <Button
    //               colorScheme="teal"
    //               width="100%"
    //               color="teal.50"
    //               p="4"
    //               size="xs"
    //               type="submit"
    //               disabled={transition.state === 'submitting' || avatarLoading}
    //               rounded="sm"
    //               borderBottomColor="teal.700"
    //               borderBottomWidth="4px"
    //             >
    //               Save Profile Changes
    //             </Button>
    //           </VStack>
    //         </Form>
    //       </VStack>
    //     </HStack>
    //   </Stack>
    // </Container>
  );
}
