import * as React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Button, Heading, HStack, IconButton } from '@chakra-ui/react';
import { Form, useNavigate } from 'remix';
import { PATH } from '~/lib/constants/nav-constants';

interface NavBarProps {
  drawerButtonRef: React.MutableRefObject<HTMLButtonElement>;
  isLoggedIn: boolean;
  isLoginPage: boolean;
  toggleMenuOpen: () => void;
}
const NavBar: React.FC<NavBarProps> = ({
  drawerButtonRef,
  isLoggedIn,
  isLoginPage,
  toggleMenuOpen,
}) => {
  const navigateTo = useNavigate();

  const toggleLoginNav = () => {
    if (isLoginPage) {
      navigateTo(PATH.SIGN_UP);
      return;
    }
    navigateTo(PATH.LOGIN);
  };

  return (
    <HStack p="4" justifyContent="space-between" bg="teal.500">
      <IconButton
        color="teal.50"
        _hover={{ color: 'teal.500', backgroundColor: 'teal.100' }}
        ref={drawerButtonRef}
        isRound
        variant="outline"
        aria-label="change avatar"
        fontSize="20px"
        onClick={toggleMenuOpen}
        icon={<HamburgerIcon />}
      />
      <Heading size="lg" as="h1" color="teal.50">
        Bills IO
      </Heading>
      {isLoggedIn ? (
        <Form method="post" action={PATH.SIGN_OUT}>
          <Button
            rounded="sm"
            size="sm"
            colorScheme="teal"
            color="teal.50"
            type="submit"
            _hover={{ borderBottomWidth: '4px' }}
          >
            Sign Out
          </Button>
        </Form>
      ) : (
        <Button rounded="sm" onClick={toggleLoginNav} colorScheme="teal">
          {isLoginPage ? 'Sign Up' : 'Login'}
        </Button>
      )}
    </HStack>
  );
};

export default NavBar;
