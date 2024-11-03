import { useEffect } from 'react'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/react'

import { Input } from '@renderer/ui'
import useStore from '@renderer/store'

import {
  FaBold,
  FaCode,
  FaRedo,
  FaUndo,
  FaItalic,
  FaParagraph,
  FaQuoteLeft,
  FaStrikethrough
} from 'react-icons/fa'
import { MdFormatClear } from 'react-icons/md'

const NoteContent = () => {
  const { activeNote, updateNote } = useStore()

  const editor = useEditor({
    extensions: [StarterKit],
    content: activeNote ? activeNote.content : '',
    editorProps: {
      attributes: {
        class:
          'min-h-[calc(100vh-125px)] h-full rounded w-full py-2 px-3 text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline'
      }
    },
    onUpdate: ({ editor }) => {
      if (!activeNote) return
      const content = editor.getHTML()
      updateNote(activeNote.id, { title: activeNote.title, content })
    }
  })

  if (!editor) return null

  useEffect(() => {
    if (editor && activeNote) {
      editor.commands.setContent(activeNote.content)
    }
  }, [activeNote, editor])

  return (
    <div className="w-full">
      <div>
        <Input
          name="title"
          value={activeNote ? activeNote.title : ''}
          onChange={(event) => {
            if (!activeNote) return
            updateNote(activeNote.id, { ...activeNote, title: event.target.value })
          }}
        />
      </div>
      <div className="py-3 px-10 w-full flex justify-between bg-zinc-800 border-b border-zinc-400">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <FaCode />
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <MdFormatClear />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          <FaParagraph />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        >
          H4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        >
          H5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <FaCode />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <FaQuoteLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FaUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FaRedo />
        </button>
      </div>
      <div className="h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default NoteContent
