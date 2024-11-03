import { Type } from '@shared'

declare global {
  interface Window {
    context: {
      findNote: Type.FindNote
      createNote: Type.CreateNote
      deleteNote: Type.DeleteNote
      updateNote: Type.UpdateNote
      findAllNotesList: Type.FindAllNotesList
    }
  }
}
