import * as React from 'react';
import {
  LoaderFunction,
  redirect,
  useLoaderData,
  Link,
  useNavigate,
} from 'remix';
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
import { PATH } from '~/lib/constants/nav-constants';

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
    .from('profiles')
    .select('username, website, avatar_url')
    .eq('id', user.id)
    .single();
  return { ...profile, user, error };
};

export default function Profile() {
  const { avatar_url, username, user, website } = useLoaderData<LoaderData>();
  const navigateTo = useNavigate();

  return (
    <Container p="4">
      <Stack spacing={4} justifyContent="center">
        <HStack spacing={4} justifyContent="space-around">
          <Avatar src={`/images/avatars/${avatar_url}`} size="2xl" />
          <VStack alignItems="flex-start">
            <Text as="h3" fontSize="3xl" fontWeight="semibold">
              {username}
            </Text>
            <Text maxW="400px" fontSize="xl" isTruncated>
              {user.email}
            </Text>
            {website ? (
              <a target="_blank" rel="noopener" href={website}>
                <Text maxW="400px" fontSize="xl" isTruncated color="blue.400">
                  {website}
                </Text>
              </a>
            ) : (
              <Text fontSize="xl">Edit Profile to add a website.</Text>
            )}
          </VStack>
        </HStack>
        <Button
          colorScheme="teal"
          color="teal.50"
          p="4"
          size="xs"
          onClick={() => navigateTo(`/profile/${user?.id}/edit`)}
          rounded="sm"
          borderBottomColor="teal.700"
          borderBottomWidth="4px"
        >
          Update Profile
        </Button>
      </Stack>
    </Container>
  );
}
