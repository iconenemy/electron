import { app } from 'electron'
import * as path from 'node:path'
import { v4 as uuidv4 } from 'uuid'
import * as fs from 'node:fs/promises'

import { Type } from '@shared'

class ServerApi {
  static #instance: ServerApi
  private readonly fileData = 'data.json'

  private constructor() {}

  public static get instance(): ServerApi {
    if (!ServerApi.#instance) {
      ServerApi.#instance = new ServerApi()
      this.#instance.init()
    }

    return ServerApi.#instance
  }

  private async init(): Promise<void> {
    const filePath = this.getFilePath()
    try {
      await fs.access(filePath)
    } catch (err) {
      const jsonData = JSON.stringify({ list: [] }, null, 2)
      fs.writeFile(filePath, jsonData, 'utf-8')
    }
  }

  async createNote(): Promise<string | null> {
    try {
      const fileData = await this.getJSONFile()

      const newNote: Type.Note = {
        id: uuidv4(),
        title: '',
        content: ''
      }

      fileData.list.unshift(newNote)

      await this.writeDataToJSONFile(fileData)
      return newNote.id
    } catch (error) {
      console.error('Error updating file:', error)
      return null
    }
  }

  async findAllNotesList(): Promise<Array<Type.Note>> {
    try {
      const fileData = await this.getJSONFile()
      return fileData.list
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error('Error reading or parsing JSON file:', error.message)
      return []
    }
  }

  async findNote(noteId: string): Promise<Type.Note | null> {
    try {
      const fileData = await this.getJSONFile()
      const noteCandedate = fileData.list.find(({ id }) => id === noteId)
      if (!noteCandedate) throw Error('Note does not exist')

      return noteCandedate
    } catch (error: unknown) {
      if (error instanceof Error) console.error('Error finding note by id:', error.message)
      return null
    }
  }

  async updateNote(noteId: string, updatedData: Omit<Type.Note, 'id'>): Promise<Type.Note> {
    const fileData = await this.getJSONFile()

    const newNotesList = fileData.list.map((note) =>
      note.id === noteId
        ? { ...note, title: updatedData.title, content: updatedData.content }
        : note
    )
   
    await this.writeDataToJSONFile({ list: newNotesList })
    
    return { id: noteId, title: updatedData.title, content: updatedData.content }
  }

  async deleteNote(noteId: string): Promise<void> {
    const fileData = await this.getJSONFile()

    const newNotesList = fileData.list.filter(({ id }) => id !== noteId)
    await this.writeDataToJSONFile({ list: newNotesList })
  }

  private getFilePath(): string {
    const userDataPath = app.getPath('userData')
    return path.join(userDataPath, this.fileData)
  }

  private async getJSONFile(): Promise<Type.JSONData> {
    const data = await fs.readFile(this.getFilePath(), 'utf8')
    return JSON.parse(data)
  }

  private async writeDataToJSONFile(fileData: Type.JSONData): Promise<void> {
    const filePath = this.getFilePath()
    await fs.writeFile(filePath, JSON.stringify(fileData, null, 2), 'utf-8')
  }
}

export default ServerApi.instance
