export type CreateNote = () => Promise<string | null>
export type FindAllNotesList = () => Promise<Array<Note>>
export type DeleteNote = (noteId: string) => Promise<void>
export type FindNote = (noteId: string) => Promise<Note | null>
export type UpdateNote = (noteId: string, updatedData: Omit<Note, 'id'>) => Promise<Note>

export type JSONData = {
  list: Array<Note>
}

export type Note = {
  id: string
  title: string
  content: string
}
