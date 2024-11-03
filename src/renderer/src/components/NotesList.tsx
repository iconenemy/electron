import { useEffect } from 'react'

import { NotePreview } from '.'
import useStore from '@renderer/store'

const NotesList = () => {
  const { findAllNotesList, notesList } = useStore()

  useEffect(() => {
    findAllNotesList()
  }, [findAllNotesList])

  return (
    <ul className="mt-10 w-full flex h-[calc(100vh-110px)] flex-col overflow-y-auto">
      {!notesList.length ? (
        <span className='text-center'>You don't have any notes yet</span>
      ) : (
        notesList.map((note) => <NotePreview key={note.id} {...note} />)
      )}
    </ul>
  )
}

export default NotesList
