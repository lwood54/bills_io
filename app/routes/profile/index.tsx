import * as React from 'react';
import { LoaderFunction, redirect, useLoaderData, Link } from 'remix';
import { User } from '@supabase/supabase-js';
import { isAuthenticated, getUserByRequestToken } from '~/lib/auth';
import { supabase } from '~/lib/supabase/supabase.server';
import {
  Avatar,
  Button,
  Container,
  HStack,
  LinkBox,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

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
    <Container p="4">
      <Stack spacing={4}>
        <HStack spacing={4}>
          <Avatar src={`/images/avatars/${avatar_url}`} size="2xl" />
          <VStack alignItems="flex-start">
            <Text as="h3" fontSize="3xl" fontWeight="semibold">
              {username}
            </Text>
            {website ? (
              <a target="_blank" rel="noopener" href={website}>
                <Text color="blue.400">{website}</Text>
              </a>
            ) : (
              <Text>Edit Profile to add a website.</Text>
            )}
          </VStack>
        </HStack>
        <Button colorScheme="teal">
          <Link to={`/profile/${user?.id}/edit`}>Update Profile Details</Link>
        </Button>
      </Stack>
    </Container>
  );
}
