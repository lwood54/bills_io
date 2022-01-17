import { Button, Container, Input, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { Form } from 'remix';

interface LoginFormProps {
  errorMessage: string;
  isLogin: boolean;
  isSubmitting: boolean;
}
const LoginForm: React.FC<LoginFormProps> = ({
  errorMessage,
  isLogin,
  isSubmitting,
}) => {
  return (
    <Form method="post">
      <Container>
        <Stack p="4">
          {errorMessage && <h2>{errorMessage}</h2>}
          <div>
            <Text fontSize="2xl">Email</Text>
            <Input
              focusBorderColor="brand.secondary"
              id="email"
              name="email"
              type="email"
              required
              size="lg"
            />
          </div>
          <div>
            <Text fontSize="2xl">Password</Text>
            <Input
              focusBorderColor="brand.secondary"
              id="password"
              name="password"
              type="password"
              required
              size="lg"
            />
          </div>
          <Button
            rounded="sm"
            type="submit"
            size="lg"
            colorScheme="teal"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            spinnerPlacement="start"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </Stack>
      </Container>
    </Form>
  );
};

export default LoginForm;
