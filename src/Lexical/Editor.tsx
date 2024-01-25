import { useState } from "react";
import { HEADING, QUOTE, CODE } from "@lexical/markdown";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListNode, ListItemNode } from "@lexical/list";
import "prismjs/components/prism-javascript";
import { LoadStatePlugin } from "./plugins/LoadStatePlugin";
import { CustomDecoratorNode } from "./nodes/CustomDecoratorNode";
import TreeViewPlugin from "./plugins/TreeViewPlugin";

function onError(error: any) {
  console.error(error);
}

function Placeholder() {
  return (
    <div className="pointer-events-none absolute -top-4 px-2 py-4 text-gray-300">
      Start writing text here...
    </div>
  );
}

export type DocumentEditorProps = {
  documentId: string;
  content: object;
};

export function DocumentEditor(props: DocumentEditorProps) {
  const initialConfig: InitialConfigType = {
    namespace: "MyEditor",
    nodes: [
      HeadingNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      LinkNode,
      ListNode,
      ListItemNode,
      CustomDecoratorNode,
    ],
    theme: {},
    onError,
  };

  const [editorRef, setEditorRef] = useState<any>();
  const onEditorRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setEditorRef(_floatingAnchorElem);
    }
  };

  const contentEditable = (
    <div className="-ml-8" ref={onEditorRef}>
      <ContentEditable className="h-full w-full max-w-none pl-8 outline-none" />
    </div>
  );

  return (
    <>
      <div>Editor:</div>
      <div className="relative border m-4 p-2 rounded">
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={contentEditable}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <MarkdownShortcutPlugin transformers={[QUOTE, HEADING, CODE]} />
          <LoadStatePlugin content={props.content} />
          <TreeViewPlugin />
        </LexicalComposer>
      </div>
    </>
  );
}
