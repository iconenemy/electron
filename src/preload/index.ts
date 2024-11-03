import { contextBridge, ipcRenderer } from 'electron'

import { Chanel, Type } from '@shared'

if (!process.contextIsolated) {
  throw new Error('ContextIsolated must be enabled in ther BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    createNote: (...args: Parameters<Type.CreateNote>) =>
      ipcRenderer.invoke(Chanel.createNote, ...args),

    deleteNote: (...args: Parameters<Type.DeleteNote>) =>
      ipcRenderer.invoke(Chanel.deleteNote, ...args),

    updateNote: (...args: Parameters<Type.UpdateNote>) =>
      ipcRenderer.invoke(Chanel.updateNote, ...args),

    findAllNotesList: (...args: Parameters<Type.FindAllNotesList>) =>
      ipcRenderer.invoke(Chanel.findAllNotesList, ...args),

    findNote: (...args: Parameters<Type.FindNote>) => ipcRenderer.invoke(Chanel.findNote, ...args)
  })
} catch (error: unknown) {
  console.error('Failed to expose context methods:', error)
}
