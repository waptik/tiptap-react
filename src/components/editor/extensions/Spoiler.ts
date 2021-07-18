import { Mark, mergeAttributes } from '@tiptap/react';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    spoiler: {
      /**
       * Set the indent attribute
       */
      setSpoiler: () => ReturnType;
      /**
       * Set the indent attribute
       */
      toggleSpoiler: () => ReturnType;
      /**
       * Unset spoiler
       */
      unsetSpoiler: () => ReturnType;
    };
  }
}

export const Spoiler = Mark.create({
  name: 'spoiler',

  inclusive: false,

  defaultOptions: {
    HTMLAttributes: {
      'data-spoiler': ''
    }
  },

  addAttributes() {
    return {
      'data-spoiler': {
        default: ''
      }
    };
  },

  parseHTML() {
    return [{ tag: `span[data-spoiler]` }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0
    ];
  },

  addCommands() {
    return {
      setSpoiler: () => ({ commands }) => {
        return commands.setMark('spoiler');
      },
      toggleSpoiler: () => ({ commands }) => {
        return commands.toggleMark('spoiler', this.options.HTMLAttributes);
      },
      unsetSpoiler: () => ({ commands }) => {
        return commands.unsetMark('spoiler');
      }
    };
  }
});
