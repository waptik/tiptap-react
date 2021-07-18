import {
  Link as ChakraLink,
  Box,
  Text,
  Code,
  List,
  ListIcon,
  ListItem
} from '@chakra-ui/react';
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons';

import { Hero } from '../components/Hero';
import { Container } from '../components/Container';
import { Main } from '../components/Main';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import TiptapExample from '../components/TiptapExample';

const Index = () => {
  const links = [
    {
      href: 'https://www.tiptap.dev',
      label: 'Tiptap headless editor v2'
    },
    {
      href: 'https://nextjs.org',
      label: 'Next.js'
    },
    {
      href: 'https://chakra-ui.com',
      label: 'Chakra-ui'
    }
  ];

  return (
    <Container height="100vh">
      <Hero />
      <Main>
        <Text>
          An example of Tiptap v2 react with Chakra-ui <Code>Tiptap v2</Code> +{' '}
          <Code>Next.js</Code> + <Code>Chakra-ui</Code>.
        </Text>

        <TiptapExample />

        <List spacing={3} my={0}>
          {links.map(({ href, label }) => (
            <ListItem key={label}>
              <ListIcon as={CheckCircleIcon} color="blue.500" />
              <ChakraLink
                isExternal
                href={href}
                flexGrow={1}
                mr={2}
                color="blue.500"
                _hover={{
                  textDecoration: 'none'
                }}
              >
                {label} <LinkIcon />
              </ChakraLink>
            </ListItem>
          ))}
        </List>
      </Main>

      <DarkModeSwitch />
      <Footer>
        <Text>
          {' '}
          <ChakraLink
            href="https://twitter.com/_waptik"
            isExternal
            color="blue.500"
            _hover={{
              textDecoration: 'none'
            }}
          >
            Stephane
          </ChakraLink>{' '}
          made this with ❤️
        </Text>
      </Footer>
      <CTA />
    </Container>
  );
};

export default Index;
