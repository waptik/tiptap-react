import { Stack, StackProps } from '@chakra-ui/react';

export const Main = (props: StackProps) => (
  <Stack
    spacing={6}
    width="100%"
    maxWidth="48rem"
    pt="8rem"
    px="1rem"
    {...props}
  />
);
