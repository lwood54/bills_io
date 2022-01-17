import * as React from 'react';

interface AddBillProps {
  name: string;
}
const AddBill: React.FC<AddBillProps> = ({ name }) => {
  return (
    <>
      <h1>Add Bill Page</h1>
    </>
  );
};

export default AddBill;
