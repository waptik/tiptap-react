import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Code from '@tiptap/extension-code';
import Typography from '@tiptap/extension-typography';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import CharacterCount from '@tiptap/extension-character-count';
import { Extensions } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

import { TipTapCustomImage } from './Image';
import { Indentation } from './Indentation';
import { Spoiler } from './Spoiler';
import { ColorHighlighter } from './ColorHighlighter';
import { SmilieReplacer } from './SmilieReplacer';
import { UploadFn } from './Image/upload_image';

interface GetTipTapExtensions {
  withImage?: boolean;
  handleUpload: UploadFn;
  limit?: number;
  placeholder?: string;
}

export function getTipTapExtensions({
  placeholder,
  withImage,
  handleUpload,
  limit
}: GetTipTapExtensions) {
  let extensions: Extensions;

  if (withImage) {
    extensions = [
      StarterKit.configure({
        heading: {
          levels: [2, 3]
        }
      }),
      Document,
      Paragraph,
      Text,
      Code,
      Typography,
      Placeholder.configure({
        placeholder
      }),
      CodeBlockLowlight,
      CharacterCount.configure({
        limit
      }),
      Link,
      Underline,
      Indentation,
      Spoiler,
      ColorHighlighter,
      Highlight,
      SmilieReplacer,
      TipTapCustomImage(handleUpload)
    ];
  } else {
    extensions = [
      StarterKit.configure({
        heading: {
          levels: [2, 3]
        }
      }),
      Document,
      Paragraph,
      Text,
      Code,
      Typography,
      Placeholder.configure({
        placeholder
      }),
      CodeBlockLowlight,
      CharacterCount.configure({
        limit
      }),
      Link,
      Underline,
      Indentation,
      Spoiler,
      ColorHighlighter,
      Highlight,
      SmilieReplacer
    ];
  }

  return extensions;
}
