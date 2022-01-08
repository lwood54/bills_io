import * as React from 'react';
import { LoaderFunction, redirect, useLoaderData, Link } from 'remix';
import { User } from '@supabase/supabase-js';
import { isAuthenticated, getUserByRequestToken } from '~/lib/auth';
import { supabase } from '~/lib/supabase/supabase.server';

type LoaderData = {
  user: User;
  username?: string;
  website?: string;
  avatar_url?: string;
  avatarBlob?: Blob | null;
};

export let loader: LoaderFunction = async ({ request }) => {
  if (!(await isAuthenticated(request))) return redirect('/login');
  const { user } = await getUserByRequestToken(request);
  const { data: profile, error } = await supabase
    .from('profiles')
    .select(`username, website, avatar_url`)
    .eq('id', user.id)
    .single();
  return { ...profile, user, error };
};

export default function Profile() {
  const { avatar_url, username, user, website } = useLoaderData<LoaderData>();

  return (
    <div>
      <img src={`/images/avatars/${avatar_url}`} alt={username} />
      <Link to={`/profile/${user?.id}/edit`}>Update Profile Details</Link>
    </div>
  );
}
