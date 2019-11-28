import { notesServiceImpl } from '../../services/notes/notes.service'
import { noteSchema } from '../../validators/notes/note'
import { Files } from '../../shared/helpers/files'
import { json, ARRAY } from 'sequelize'

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

    public async createNote(body:any, files:any) {

        //Validate
        const request: any = {
            labels: body.labels,
            title: body.title,
            notes: ['1','2','3'], // - - - - 
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

    public async deleteNote(id: any) {
        const response = await services.noteService.deleteNote(id)
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

        const response = await services.noteService.updateNote(id, request, files)
        return response
    }

}