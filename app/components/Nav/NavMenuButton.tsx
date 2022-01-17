import * as React from 'react';
import { Text } from '@chakra-ui/react';

const NavMenuButton: React.FC = ({ children }) => {
  return (
    <Text
      borderRadius="sm"
      display="flex"
      justifyContent="center"
      p="1"
      _hover={{
        backgroundColor: 'blue.100',
      }}
      bg="gray.100"
    >
      {children}
    </Text>
  );
};

export default NavMenuButton;
