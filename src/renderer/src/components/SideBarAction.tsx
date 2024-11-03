import { Button } from '@renderer/ui'
import useStore from '@renderer/store'

import { MdDelete } from 'react-icons/md'
import { IoCreate } from 'react-icons/io5'

const SideBarAction = () => {
  const { createNote, deleteNote, activeNote } = useStore()

  const handleDeleteNote = () => {
    if (!activeNote) return
    deleteNote(activeNote.id)
  }

  const handleCreateNote = () => {
    createNote()
  }

  return (
    <div className="px-4 w-full flex items-center justify-between">
      <Button onClick={handleDeleteNote}>
        <MdDelete />
      </Button>
      <Button onClick={handleCreateNote}>
        <IoCreate />
      </Button>
    </div>
  )
}

export default SideBarAction
