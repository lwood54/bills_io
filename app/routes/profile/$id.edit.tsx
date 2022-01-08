import { useState } from 'react';
import {
  LoaderFunction,
  redirect,
  useLoaderData,
  useActionData,
  Form,
  useTransition,
  ActionFunction,
} from 'remix';
import { User } from '@supabase/supabase-js';
import { getUserByRequestToken, isAuthenticated } from '~/lib/auth';
import { supabase } from '~/lib/supabase/supabase.server';
import { supabaseClient } from '~/lib/supabase';

type Profile = {
  username?: string;
  website?: string;
  avatar_url?: string;
};

export let loader: LoaderFunction = async ({ request, params }) => {
  if (!(await isAuthenticated(request))) return redirect('/auth');
  const { data: profile, error } = await supabase
    .from('profiles')
    .select(`username, website, avatar_url`)
    .eq('id', params.id)
    .single();
  if (!profile)
    throw new Response('Not Found', {
      status: 404,
    });
  return { profile, error };
};

export let action: ActionFunction = async ({ request }) => {
  const { user } = await getUserByRequestToken(request);
  const form = await request.formData();
  const username = form.get('username');
  const website = form.get('website');

  const { error } = await supabase
    .from('profiles')
    .upsert({ username, website, id: user.id, updated_at: new Date() });
  if (error) {
    return { error };
  }
  return redirect('/profile');
};

export default function ProfileEdit() {
  const transition = useTransition();
  const { profile, user } = useLoaderData<{ profile: Profile; user?: User }>();
  const errors = useActionData<Profile>();
  const [avatarUrl, setAvatarUrl] = useState<string>(profile?.avatar_url || '');
  const [avatarLoading, setAvatarLoading] = useState<boolean>(false);

  async function handleFileChange(event: any) {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.');
    }
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    setAvatarLoading(true);
    let resp = await supabaseClient.storage
      .from('avatars')
      .upload(filePath, file);
    if (resp?.error) {
      throw resp.error;
    }

    supabaseClient
      .from('profiles')
      .upsert({ id: user?.id, avatar_url: filePath });
    let downloadingImage = new Image();
    downloadingImage.onload = function () {
      setAvatarUrl(filePath);
      setAvatarLoading(false);
    };
    downloadingImage.src = `/images/avatars/${filePath}`;
  }

  return (
    <div>
      Profile Picture
      <img src={`/images/avatars/${avatarUrl}`} alt={profile?.username} />
      <div>
        <div>
          <div>
            <div>
              <label>
                <span>Choose profile photo</span>
                <input
                  type="file"
                  name="avatar-upload"
                  style={{
                    backgroundColor: 'violet',
                    border: '1px solid black',
                  }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <small>
              {avatarLoading
                ? `updating...`
                : `choose an image file to update your profile pic`}
            </small>
          </div>
          <br />
          <div>Profile Details</div>
          <Form method="post">
            <fieldset>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  defaultValue={profile.username}
                />
                <div>{errors?.username && errors.username}</div>
              </div>
              <div>
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  required
                  defaultValue={profile.website}
                />
                <div>{errors?.website && errors.website}</div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={transition.state === 'submitting'}
                >
                  Update Profile
                </button>
              </div>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}
