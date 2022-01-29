import * as React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Bill } from '~/lib/types/bills-types';
import { formatToMoney } from '~/lib/helpers/bills-helpers';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Form, useNavigate } from 'remix';
import { PATH } from '~/lib/constants/nav-constants';

interface BillRowProps {
  isAlt: boolean;
  bill: Bill;
}
const BillRow: React.FC<BillRowProps> = ({ bill, isAlt }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditBill = () => {
    navigate(PATH.BILLS.EDIT.replace(':uuid', `${bill.id}`));
  };

  return (
    <AccordionItem
      bgColor={isAlt ? 'cyan.50' : 'cyan.600'}
      color={isAlt ? 'cyan.600' : 'cyan.50'}
    >
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontWeight="semibold">
            {bill.name}: {formatToMoney(bill.balance)}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} bgColor="gray.500" color="teal.50">
        <HStack justifyContent="space-between">
          <div>
            <Text>Day Due: {bill.dayDue}</Text>
            <Text>Interest: {bill.interest}%</Text>
            <Text>Default Payment: {formatToMoney(bill.payment)}</Text>
          </div>
          <HStack justifyContent="space-around">
            <IconButton
              colorScheme="cyan"
              color="cyan.50"
              rounded="full"
              aria-label="edit-bill"
              icon={<EditIcon />}
              onClick={handleEditBill}
            />
            <IconButton
              colorScheme="red"
              color="red.50"
              rounded="full"
              aria-label="delete-bill"
              icon={<DeleteIcon />}
              onClick={onOpen}
            />
          </HStack>
        </HStack>
      </AccordionPanel>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded="sm">
          <ModalHeader>Remove Bill Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to remove{' '}
              <Text as="span" fontWeight="semibold">
                "{bill.name}"
              </Text>
              ?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              borderBottomWidth="4px"
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              rounded="sm"
              variant="outline"
            >
              Close
            </Button>
            <Form
              method="post"
              action={PATH.BILLS.DELETE.replace(':uuid', `${bill.id}`)}
              reloadDocument
            >
              <Button
                size="sm"
                rounded="sm"
                borderBottomWidth="4px"
                borderBottomColor="red.600"
                variant="solid"
                colorScheme="red"
                type="submit"
              >
                Remove Bill
              </Button>
            </Form>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AccordionItem>
  );
};

export default BillRow;
