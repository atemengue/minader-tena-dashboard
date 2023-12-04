// src/Tiptap.jsx
import {
  CButton,
  CButtonGroup,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CSelect,
  CTooltip,
} from "@coreui/react";
import {
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faBold,
  faGripLinesVertical,
  faHeading,
  faHeartbeat,
  faItalic,
  faListOl,
  faListUl,
  faParagraph,
  faRedo,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import "../scss/_editor.scss";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="editor__header">
      <CButtonGroup role="group" aria-label="MenuBar">
        <CTooltip placement="bottom" content="Annuler">
          <CButton
            color="light"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <FontAwesomeIcon size="1x" icon={faUndo} className="mr-2" />
          </CButton>
        </CTooltip>

        <CTooltip placeholder="Retablir" placement="bottom">
          <CButton
            color="light"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <FontAwesomeIcon size="1x" icon={faRedo} className="mr-2" />
          </CButton>
        </CTooltip>

        <CTooltip placement="bottom" content="Gras">
          <CButton
            color="light"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <FontAwesomeIcon size="1x" icon={faBold} className="mr-2" />
          </CButton>
        </CTooltip>

        <CTooltip placement="bottom" content="Italique">
          <CButton
            color="light"
            className={editor.isActive("italic") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <FontAwesomeIcon size="1x" icon={faItalic} className="mr-2" />
          </CButton>
        </CTooltip>

        <CTooltip placement="bottom" content="Paragraphe">
          <CButton
            color="light"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "is-active" : ""}
          >
            <FontAwesomeIcon size="1x" icon={faParagraph} className="mr-2" />
          </CButton>
        </CTooltip>

        <CTooltip placement="bottom" content="Aller a la ligne">
          <CButton
            color="light"
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            <FontAwesomeIcon
              size="1x"
              icon={faGripLinesVertical}
              className="mr-2"
            />
          </CButton>
        </CTooltip>

        <CTooltip placement="bottom" content="numérotation">
          <CButton
            color="light"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <FontAwesomeIcon size="1x" icon={faListOl} className="mr-2" />
          </CButton>
        </CTooltip>

        <CTooltip placement="bottom" content="Puces">
          <CButton
            color="light"
            className={editor.isActive("bulletList") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <FontAwesomeIcon size="1x" icon={faListUl} className="mr-2" />
          </CButton>
        </CTooltip>
        <CTooltip placement="bottom" content="Centrer">
          <CButton
            color="light"
            onClick={() => editor.commands.setTextAlign("center")}
            className={editor.isActive("centrer") ? "is-active" : ""}
          >
            <FontAwesomeIcon size="1x" icon={faAlignCenter} className="mr-2" />
          </CButton>
        </CTooltip>

        <CTooltip placement="bottom" content="Justifié">
          <CButton
            color="light"
            onClick={() => editor.commands.setTextAlign("justify")}
            className={editor.isActive("centrer") ? "is-active" : ""}
          >
            <FontAwesomeIcon size="1x" icon={faAlignJustify} className="mr-2" />
          </CButton>
        </CTooltip>

        <CTooltip placement="bottom" content="Aligner à Droite">
          <CButton
            color="light"
            onClick={() => editor.commands.setTextAlign("right")}
            className={editor.isActive("right") ? "is-active" : ""}
          >
            <FontAwesomeIcon size="1x" icon={faAlignRight} className="mr-2" />
          </CButton>
        </CTooltip>

        <CTooltip placement="bottom" content="Aligner à Gauche">
          <CButton
            color="light"
            onClick={() => editor.commands.setTextAlign("left")}
            className={editor.isActive("left") ? "is-active" : ""}
          >
            <FontAwesomeIcon size="1x" icon={faAlignLeft} className="mr-2" />
          </CButton>
        </CTooltip>

        <CTooltip content="taille de police">
          <CSelect
            onChange={(e) => editor.commands.setFontSize(e.target.value)}
            defaultValue={10}
            custom
            size="md"
            name="selectSm"
            id="SelectLm"
          >
            <option key="1" value="14">
              14
            </option>
            <option key="15" value="15">
              15
            </option>
            <option key="16" value="16">
              16
            </option>
            <option key="17" value="17">
              17
            </option>
            <option key="18" value="18">
              18
            </option>
            <option key="19" value="19">
              19
            </option>
            <option key="20" value="20">
              20
            </option>
            <option key="21" value="21">
              21
            </option>
            <option key="22" value="22">
              22
            </option>
            <option key="23" value="23">
              23
            </option>
            <option key="24" value="24">
              24
            </option>
          </CSelect>
        </CTooltip>

        <CTooltip placement="bottom" content="Titre niveau 1">
          <CButton
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
            color="light"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            h1
          </CButton>
        </CTooltip>
        <CTooltip placement="bottom" content="Titre niveau 2">
          <CButton
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
            color="light"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            h2
          </CButton>
        </CTooltip>
        <CTooltip placement="bottom" content="Titre niveau 3">
          <CButton
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
            color="light"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            h3
          </CButton>
        </CTooltip>
        <CTooltip placement="bottom" content="Titre niveau 4">
          <CButton
            className={
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }
            color="light"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
          >
            h4
          </CButton>
        </CTooltip>
      </CButtonGroup>
    </div>
  );
};
export default MenuBar;
