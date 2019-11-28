import { notesServiceImpl } from '../../services/notes/notes.service'
import { noteSchema } from '../../validators/notes/note'
import { Files } from '../../shared/helpers/files'

const services = {
    noteService: new notesServiceImpl()
}

const helpers = {
    files: new Files()
}

export class notesController {
    

    constructor() {
        
    }

    public async getAllNotes() {
        const response = await services.noteService.getAllNotes()
        return response
    }

    public async getAllDeletedNotes() {
        const response = await services.noteService.getAllDeletedNotes()
        return response
    }

    public async createNote(body:any, files:any) {

        //Validate
        console.log(body.notes)
        console.log(typeof(body.notes))
        const request: any = {
            labels: body.labels,
            title: body.title,
            notes: body.notes,
            color: body.color,
            userId: body.userId,
            archived: false,
            done: false,
            is_active: true
        }
        

        const validate = noteSchema.validate(request)
        if(validate.error) {
            const err = validate.error.details[0].message; 
            throw({type: "NOTES_CONTROLLER_ERROR", value: err, statusCode: 400})
        }

        //Service
        const response = await services.noteService.createNote(request, files)
        return response    
    }

    public async deleteNote(id: any, userId: any) {
        const response = await services.noteService.deleteNote(id, userId)
        return response
    }

    public async updateNote(id:any, body:any, files:any) {

        // request
        const propertyes = [ 'notes', 'title', 'color', 'archived', 'done', 'labels' ];
        const request: any = {}
        propertyes.forEach((property: string) => {
            if( body[property] ) {
                request[property] = body[property];
            }
        });
        

        const response = await services.noteService.updateNote(id, request, files, body.userId)
        return response
    }

    public async archivedNotes(userId: any) {
        const response = await services.noteService.archivedNotes(userId)
        return response
    }

    public async myNotes(userId: any) {
        const response = await services.noteService.archivedNotes(userId)
        return response
    }

    public async doneNotes(userId: any) {
        const response = await services.noteService.doneNotes(userId)
        return response
    }

    public async notDoneNotes(userId: any) {
        const response = await services.noteService.notDoneNotes(userId)
        return response
    }

}