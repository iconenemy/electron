import { app } from 'electron'
import * as path from 'node:path'
import { v4 as uuidv4 } from 'uuid'
import * as CryptoJS from 'crypto-js'
import * as fs from 'node:fs/promises'

import { Type } from '@shared'

class ServerApi {
  static #instance: ServerApi
  private readonly fileData = 'data.json'
  private readonly secretKey = 'supersecretkey'

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
      const jsonData = JSON.stringify({}, null, 2)
      const encryptedData = this.encryptData(jsonData)
      fs.writeFile(filePath, encryptedData, 'utf-8')
    }
  }

  async createNote(): Promise<string | null> {
    try {
      const fileData = await this.getJSONFile()

      const noteId = uuidv4()
      const newNote: Type.NoteContent = {
        title: '',
        content: ''
      }

      const formatedFileData = { ...fileData, [noteId]: { ...newNote } }
      await this.writeDataToJSONFile(formatedFileData)
      return noteId
    } catch (error) {
      console.error('Error updating file:', error)
      return null
    }
  }

  async findAllNotesList(): Promise<Array<Type.Note>> {
    try {
      const fileData = await this.getJSONFile()
      return Object.entries(fileData).map(([id, { content, title }]) => ({ id, content, title }))
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error('Error reading or parsing JSON file:', error.message)
      return []
    }
  }

  async findNote(noteId: string): Promise<Type.Note | null> {
    try {
      const fileData = await this.getJSONFile()
      const noteCandedate = fileData[noteId]
      if (!noteCandedate) throw Error('Note does not exist')

      const { content, title } = noteCandedate
      return { id: noteId, content: content, title }
    } catch (error: unknown) {
      if (error instanceof Error) console.error('Error finding note by id:', error.message)
      return null
    }
  }

  async updateNote(noteId: string, updatedData: Type.Note): Promise<Type.Note> {
    const fileData = await this.getJSONFile()

    const newNotesList = {
      ...fileData,
      [noteId]: { title: updatedData.title, content: updatedData.content }
    }

    await this.writeDataToJSONFile(newNotesList)

    return { id: noteId, title: updatedData.title, content: updatedData.content }
  }

  async deleteNote(noteId: string): Promise<void> {
    const fileData = await this.getJSONFile()
    delete fileData[noteId]
    await this.writeDataToJSONFile(fileData)
  }

  private getFilePath(): string {
    const userDataPath = app.getPath('userData')
    return path.join(userDataPath, this.fileData)
  }

  private async getJSONFile(): Promise<Type.JSONData> {
    const data = await fs.readFile(this.getFilePath(), 'utf8')
    const decryptedData = this.decryptData(data)
    return JSON.parse(decryptedData)
  }

  private async writeDataToJSONFile(fileData: Type.JSONData): Promise<void> {
    const filePath = this.getFilePath()
    const jsonData = JSON.stringify(fileData, null, 2)
    const encryptedData = this.encryptData(jsonData)
    await fs.writeFile(filePath, encryptedData, 'utf-8')
  }

  private encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString()
  }

  private decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey)
    return bytes.toString(CryptoJS.enc.Utf8)
  }
}

export default ServerApi.instance
