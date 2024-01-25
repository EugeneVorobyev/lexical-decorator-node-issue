import type {
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";

import { DecoratorNode } from "lexical";

export function TestNodeComponent(props: { data: string }) {
  return <div>{props.data}</div>;
}

export type SerializedTestNode = Spread<
  {
    data: string;
  },
  SerializedLexicalNode
>;

export class CustomDecoratorNode extends DecoratorNode<JSX.Element> {
  __data: string;

  static getType(): string {
    return "testNode";
  }

  constructor(data: string, key?: NodeKey) {
    super(key);
    this.__data = data;
  }

  static clone(node: CustomDecoratorNode): CustomDecoratorNode {
    return new CustomDecoratorNode(node.__data, node.__key);
  }

  static importJSON(serializedNode: SerializedTestNode): CustomDecoratorNode {
    const { data } = serializedNode;
    const node = $createTestDecorNode(data);
    return node;
  }

  isInline(): boolean {
    return false;
  }

  setData(data: string) {
    const node = this.getWritable();
    node.__data = data;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("img");
    return { element };
  }

  exportJSON(): SerializedTestNode {
    return {
      version: 1,
      type: "testNode",
      data: this.__data,
    };
  }

  //
  // Container for rendering portal
  //
  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM() {
    return true;
  }

  //
  // Content for rendering in portal
  //
  decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
    console.log(`TestNode: ${this.__data}`);
    return <TestNodeComponent data={this.__data} />;
  }
}

export function $createTestDecorNode(data: string): CustomDecoratorNode {
  return new CustomDecoratorNode(data);
}

export function $isTestDecorNode(
  node: LexicalNode | null | undefined
): node is CustomDecoratorNode {
  return node instanceof CustomDecoratorNode;
}
