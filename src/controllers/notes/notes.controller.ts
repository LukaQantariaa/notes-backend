import { notesServiceImpl } from '../../services/notes/notes.service'
import { noteSchema } from '../../validators/notes/note'
import { Files } from '../../shared/helpers/files'
import { json } from 'sequelize'

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

        //upload photo
        if(files){
            if(files.image) {
                try {
                    const imagePath = await helpers.files.uploadFile(files.image, 'notes')
                    request['imagePath'] = imagePath
                } catch(err) {
                    throw({type: "NOTES_CONTROLLER_ERROR", value: err, statusCode: 400})
                }
            }
        }

        //Service
        const response = await services.noteService.createNote(request)
        return response
        



        
    }

}