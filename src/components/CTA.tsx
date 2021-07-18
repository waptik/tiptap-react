import { Link as ChakraLink, Button } from '@chakra-ui/react';

import { Container } from './Container';

export const CTA = () => (
  <Container
    flexDirection="row"
    position="fixed"
    bottom="0"
    width="full"
    maxWidth="48rem"
    py={3}
  >
    <ChakraLink
      isExternal
      href="https://github.com/waptik/tiptap-react"
      flexGrow={3}
      mx={2}
      _hover={{textDecoration:"none"}}
    >
      <Button width="100%" variant="solid" colorScheme="blue">
        View Repo
      </Button>
    </ChakraLink>
  </Container>
);
