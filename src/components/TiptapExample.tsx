import { Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { RichTextEditor } from './editor';

function TiptapExample() {
  const [text, setText] = useState('');

  useEffect(() => {
    if (text) {
      console.log({ text });
    }
    return () => {
      setText('');
    };
  }, [text]);

  return (
    <Box id="RichTextEditor-Wrapper">
      <RichTextEditor text={text} setText={setText} />
    </Box>
  );
}

export default TiptapExample;
