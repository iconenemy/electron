import { create } from 'zustand'

import { Type } from '@shared'

interface StoreState {
  notesList: Array<Type.Note>
  isLoading: boolean
  error: string | null
  activeNote: Type.Note | null
  createNote: () => Promise<void>
  findAllNotesList: () => Promise<void>
  setActiveNote: (note: Type.Note) => void
  deleteNote: (id: string) => Promise<void>
  updateNote: (id: string, updatedData: Type.NoteContent) => Promise<void>
}

const useStore = create<StoreState>((set, get) => ({
  notesList: [],
  activeNote: null,
  isLoading: false,
  error: null,
  createNote: async () => {
    set({ isLoading: true, error: null })
    try {
      const createdId = await window['context'].createNote()
      if (!createdId) throw new Error('can not create note')
      set({ activeNote: { id: createdId, title: '', content: '' } })
      await get().findAllNotesList()
    } catch (error) {
      set({ error: 'Error creating note', isLoading: false })
    }
  },
  updateNote: async (id: string, updatedData: Type.NoteContent) => {
    set({ isLoading: true, error: null })
    try {
      const updatedNote = await window['context'].updateNote(id, updatedData)
      await get().findAllNotesList()
      set({ activeNote: updatedNote })
    } catch (error) {
      set({ error: 'Error updating note', isLoading: false })
    }
  },
  findAllNotesList: async () => {
    set({ isLoading: true, error: null })
    try {
      const result = await window['context'].findAllNotesList()
      set({ notesList: result, isLoading: false })
    } catch (err) {
      set({ error: 'Error fetching notes list', isLoading: false })
    }
  },
  deleteNote: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await window['context'].deleteNote(id)
      await get().findAllNotesList()
      set({ activeNote: { id: '', content: '', title: '' } })
    } catch (error) {
      set({ error: 'Error deleting note', isLoading: false })
    }
  },
  setActiveNote: (note: Type.Note) => {
    set({ activeNote: note })
  }
}))

export default useStore
