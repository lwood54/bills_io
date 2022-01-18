import { Text } from '@chakra-ui/react';
import * as React from 'react';
import { Link } from 'remix';
import { PATH } from '~/lib/constants/nav-constants';

const Welcome: React.FC = () => {
  return (
    <>
      <h1>Welcome to Bills IO!</h1>
      <Text>Already confirmed your email?</Text>
      <Link to={PATH.LOGIN}>Login</Link>
    </>
  );
};

export default Welcome;
