import { notesServiceImpl } from '../../services/notes/notes.service'
import { noteSchema } from '../../validators/notes/note'

const services = {
    noteService: new notesServiceImpl()
}

export class notesController {
    

    constructor() {
        
    }

    public async getAllNotes() {
        const response = await services.noteService.getAllNotes()
        return response
    }

    public async createNote(body:any, files:any) {
        //if()
        // validate
        const request = {

        }
        //upload photo

        
    }

}