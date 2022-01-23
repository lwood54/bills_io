import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import * as React from 'react';
import { FieldError } from 'react-hook-form';

interface FormInputProps {
  error?: FieldError;
  id: string;
  label?: string;
  placeholder?: string;
  spacing?: string;
  type?: 'text' | 'number' | 'email';
}

const FormInput: React.FC<FormInputProps> = React.forwardRef(
  (
    { error, id, label, placeholder, spacing = '.5', type = 'text', ...rest },
    ref
  ) => {
    return (
      <FormControl isInvalid={Boolean(error?.message)}>
        <VStack spacing={spacing} alignItems="flex-start">
          {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
          <Input
            ref={ref as React.LegacyRef<HTMLInputElement>}
            id={id}
            type={type}
            placeholder={placeholder}
            {...rest}
          />
          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </VStack>
      </FormControl>
    );
  }
);

export default FormInput;
