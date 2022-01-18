import * as React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';
import { Bill } from '~/lib/types/bills-types';
import { formatToMoney } from '~/lib/helpers/bills-helpers';

interface BillRowProps {
  isAlt: boolean;
  bill: Bill;
}
const BillRow: React.FC<BillRowProps> = ({ bill, isAlt }) => {
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
        <Text>Day Due: {bill.dayDue}</Text>
        <Text>Interest: {bill.interest}%</Text>
        <Text>Default Payment: {formatToMoney(bill.payment)}</Text>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default BillRow;
