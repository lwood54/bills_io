import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import * as React from 'react';
import { Form, Link, useLocation, useNavigate } from 'remix';
import { PATH } from '~/lib/constants/nav-constants';
import NavBar from './NavBar';
import NavMenu from './NavMenu';
import NavMenuButton from './NavMenuButton';

interface NavProps {
  isLoggedIn: boolean;
}

const Nav: React.FC<NavProps> = ({ isLoggedIn }) => {
  const isLoginPage = useLocation().pathname.includes('login');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const drawerButtonRef = React.useRef({} as HTMLButtonElement);

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <NavBar
        drawerButtonRef={drawerButtonRef}
        toggleMenuOpen={toggleMenuOpen}
        isLoggedIn={isLoggedIn}
        isLoginPage={isLoginPage}
      />
      <NavMenu
        isMenuOpen={isMenuOpen}
        toggleMenuOpen={toggleMenuOpen}
        drawerButtonRef={drawerButtonRef}
        isLoggedIn={isLoggedIn}
        isLoginPage={isLoginPage}
      />
    </>
  );
};

export default Nav;
