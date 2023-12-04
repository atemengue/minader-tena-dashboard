// src/Tiptap.jsx
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { FontSize } from "../extension/FontSize";
import "../scss/_editor.scss";
import MenuBar from "./MenuBar";

const Tiptap = ({ onChange, template, status }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      FontSize,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    content: template,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // useEffect(() => {
  //   if (template !== null) {
  //     // console.log("inside template");
  //     // console.log(template);
  //     editor.commands.setContent(template);
  //   }
  // }, [template]);
  return (
    <div className="editor">
      {/* {console.log(editor)} */}
      <MenuBar editor={editor} />
      <div className="editor__content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
