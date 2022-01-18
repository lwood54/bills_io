import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import * as React from 'react';
import { Form, Link } from 'remix';
import { PATH } from '~/lib/constants/nav-constants';
import NavMenuButton from './NavMenuButton';

interface NavMenuProps {
  isMenuOpen: boolean;
  toggleMenuOpen: () => void;
  drawerButtonRef: React.MutableRefObject<HTMLButtonElement>;
  isLoggedIn: boolean;
  isLoginPage: boolean;
}
const NavMenu: React.FC<NavMenuProps> = ({
  isMenuOpen,
  toggleMenuOpen,
  drawerButtonRef,
  isLoggedIn,
  isLoginPage,
}) => {
  return (
    <Drawer
      isOpen={isMenuOpen}
      placement="left"
      onClose={toggleMenuOpen}
      finalFocusRef={drawerButtonRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Navigation</DrawerHeader>

        <DrawerBody>
          {isLoggedIn ? (
            <>
              <Accordion allowToggle allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        User Details
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Link to={PATH.PROFILE} onClick={toggleMenuOpen}>
                      <NavMenuButton>Profile</NavMenuButton>
                    </Link>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Bills
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Link to={PATH.BILLS.VIEW} onClick={toggleMenuOpen}>
                      <NavMenuButton>View Bills</NavMenuButton>
                    </Link>
                    <Link to={PATH.BILLS.ADD} onClick={toggleMenuOpen}>
                      <NavMenuButton>Add Bill</NavMenuButton>
                    </Link>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <DrawerFooter px="3">
                <Form
                  style={{ width: '100%' }}
                  method="post"
                  action={PATH.SIGN_OUT}
                >
                  <NavMenuButton>
                    <Button
                      rounded="sm"
                      style={{ width: '100%' }}
                      type="submit"
                      onClick={toggleMenuOpen}
                      size="sm"
                      fontWeight="normal"
                      fontSize="medium"
                    >
                      Sign Out
                    </Button>
                  </NavMenuButton>
                </Form>
              </DrawerFooter>
            </>
          ) : (
            <DrawerFooter>
              <Link
                style={{ width: '100%' }}
                to={PATH.LOGIN}
                onClick={toggleMenuOpen}
              >
                <NavMenuButton>Login</NavMenuButton>
              </Link>
            </DrawerFooter>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavMenu;
