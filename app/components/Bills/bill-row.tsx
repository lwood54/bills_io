import * as React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { Bill } from '~/lib/types/bills-types';
import { formatToMoney } from '~/lib/helpers/bills-helpers';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useNavigate } from 'remix';
import { PATH } from '~/lib/constants/nav-constants';

interface BillRowProps {
  isAlt: boolean;
  bill: Bill;
}
const BillRow: React.FC<BillRowProps> = ({ bill, isAlt }) => {
  const navigate = useNavigate();
  const handleRemoveBill = () => {
    console.log('remove bill');
  };

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
              aria-label="delete-bill"
              icon={<DeleteIcon />}
              onClick={handleRemoveBill}
            />
            <IconButton
              colorScheme="cyan"
              color="cyan.50"
              rounded="full"
              aria-label="edit-bill"
              icon={<EditIcon />}
              onClick={handleEditBill}
            />
          </HStack>
        </HStack>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default BillRow;
