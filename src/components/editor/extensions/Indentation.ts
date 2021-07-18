import { Command, Extension } from "@tiptap/core";
import { Node } from "prosemirror-model";
import { AllSelection, TextSelection, Transaction } from "prosemirror-state";

/**
 * Indentation plugin for tiptap
 * @see https://github.com/ueberdosis/tiptap/issues/1036#issue-864043820
 */

type IndentOptions = {
	types: string[];
	indentLevels: number[];
	defaultIndentLevel: number;
};

declare module "@tiptap/core" {
	interface Commands {
		indent: {
			/**
			 * Set the indent attribute
			 */
			indent: () => Command;
			/**
			 * Unset the indent attribute
			 */
			outdent: () => Command;
		};
	}
}

export function clamp(val: number, min: number, max: number): number {
	if (val < min) {
		return min;
	}
	if (val > max) {
		return max;
	}
	return val;
}

export enum IndentProps {
	min = 0,
	max = 210,

	more = 30,
	less = -30,
}

export function isBulletListNode(node: Node): boolean {
	return node.type.name === "bullet_list";
}

export function isOrderedListNode(node: Node): boolean {
	return node.type.name === "order_list";
}

export function isTodoListNode(node: Node): boolean {
	return node.type.name === "todo_list";
}

export function isListNode(node: Node): boolean {
	return isBulletListNode(node) || isOrderedListNode(node) || isTodoListNode(node);
}

function setNodeIndentMarkup(tr: Transaction, pos: number, delta: number): Transaction {
	if (!tr.doc) return tr;

	const node = tr.doc.nodeAt(pos);
	if (!node) return tr;

	const minIndent = IndentProps.min;
	const maxIndent = IndentProps.max;

	const indent = clamp((node.attrs.indent || 0) + delta, minIndent, maxIndent);

	if (indent === node.attrs.indent) return tr;

	const nodeAttrs = {
		...node.attrs,
		indent,
	};

	return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
}

function updateIndentLevel(tr: Transaction, delta: number): Transaction {
	const { doc, selection } = tr;

	if (!doc || !selection) return tr;

	if (!(selection instanceof TextSelection || selection instanceof AllSelection)) {
		return tr;
	}

	const { from, to } = selection;

	doc.nodesBetween(from, to, (node, pos) => {
		const nodeType = node.type;

		if (nodeType.name === "paragraph" || nodeType.name === "heading") {
			tr = setNodeIndentMarkup(tr, pos, delta);
			return false;
		}
		if (isListNode(node)) {
			return false;
		}
		return true;
	});

	return tr;
}

export const Indentation = Extension.create<IndentOptions>({
	name: "indent",

	defaultOptions: {
		types: ["heading", "paragraph"],
		indentLevels: [0, 30, 60, 90, 120, 150, 180, 210],
		defaultIndentLevel: 0,
	},

	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					indent: {
						default: this.options.defaultIndentLevel,
						renderHTML: attributes => ({
							style: `margin-left: ${attributes.indent}px!important;`,
						}),
						parseHTML: element => ({
							indent: parseInt(element.style.marginLeft) || this.options.defaultIndentLevel,
						}),
					},
				},
			},
		];
	},

	addCommands() {
		return {
			indent:
				() =>
				({ tr, state, dispatch }) => {
					const { selection } = state;
					tr = tr.setSelection(selection);
					tr = updateIndentLevel(tr, IndentProps.more);

					if (tr.docChanged) {
						// eslint-disable-next-line no-unused-expressions
						dispatch?.(tr);
						return true;
					}

					return false;
				},
			outdent:
				() =>
				({ tr, state, dispatch }) => {
					const { selection } = state;
					tr = tr.setSelection(selection);
					tr = updateIndentLevel(tr, IndentProps.less);

					if (tr.docChanged) {
						dispatch?.(tr);
						return true;
					}

					return false;
				},
		};
	},

	addKeyboardShortcuts() {
		return {
			Tab: () => this.editor.commands.indent() as unknown as boolean,
			"Shift-Tab": () => this.editor.commands.outdent() as unknown as boolean,
		};
	},
});
