import React, { useRef } from 'react'
import JoditEditor from "jodit-react";

const EditorJodit = ({ config, value, onChange }) => {
    const editor = useRef(null);
    const contentChange = (content) => {
      onChange(content);
    };
  return (
    <JoditEditor
      ref={editor}
      value={value || ""}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onChange={contentChange}
    />
  )
}

export default EditorJodit