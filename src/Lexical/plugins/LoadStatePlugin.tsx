import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CLEAR_HISTORY_COMMAND } from "lexical";
import { useEffect, useRef } from "react";

/**
 * Проверяет и загружает начальное состояние редактор
 */
export function LoadStatePlugin({ content }: any) {
  const [editor] = useLexicalComposerContext();
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!isLoaded.current) {
      const editorState = editor.parseEditorState(content.editorState);

      queueMicrotask(() => {
        editor.setEditorState(editorState);
        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
      });

      isLoaded.current = true;
    }
  }, [editor]);

  return null;
}
