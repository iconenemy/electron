export type CreateNote = () => Promise<string | null>
export type FindAllNotesList = () => Promise<Array<Note>>
export type DeleteNote = (noteId: string) => Promise<void>
export type FindNote = (noteId: string) => Promise<Note | null>
export type UpdateNote = (noteId: string, updatedData: NoteContent) => Promise<Note>

export type JSONData = Record<string, NoteContent>

export type Note = {
  id: string
  title: string
  content: string
}

export type NoteContent = {
  title: string
  content: string
}
