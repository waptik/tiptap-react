import { Box, Text, Link as ChakraLink } from '@chakra-ui/react';

import { IconMarkdown, IconExternalLink } from './icons';

const MarkdownHelpText = () => {
  return (
    <Text className="MarkdownHelpText" fontSize="sm" color="gray.500" pt={2}>
      <ChakraLink
        isExternal
        href="https://www.markdownguide.org/cheat-sheet/"
        colorScheme="blue"
        aria-label="Learn more about Markdown"
        _hover={{
          textDecoration: 'none'
        }}
      >
        <Box as={IconMarkdown} boxSize={4} /> Markdown is supported.
      </ChakraLink>{' '}
      <Box as="span">
        <Box as={IconExternalLink} boxSize={3} />
      </Box>
    </Text>
  );
};

export default MarkdownHelpText;
