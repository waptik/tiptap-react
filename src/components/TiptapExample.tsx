import { Box, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

import { RichTextEditor } from "./editor";

function TiptapExample() {
  const [text, setText] = useState("");
  const borderColor = useColorModeValue("gray.900", "whiteAlpha.900");

  return (
    <Stack
      id="RichTextEditor-Wrapper"
      justify="space-evenly"
      direction="row"
      spacing={5}
    >
      <Box>
        <RichTextEditor text={text} setText={setText} />
      </Box>
      <Flex direction="column">
        <Text w="full" pb={4}>
          Result:
        </Text>
        <Box borderWidth="3px" borderColor={borderColor} borderBlock="solid">
          <Box
            px={2}
            pb={2}
            dangerouslySetInnerHTML={{ __html: text }}
            pt={2}
          />
        </Box>
      </Flex>
    </Stack>
  );
}

export default TiptapExample;
