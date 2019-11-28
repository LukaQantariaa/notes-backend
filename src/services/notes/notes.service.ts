import { NoteRepositoryImplPostgress } from '../../repository/notes/notes.repository'
import { Files } from '../../shared/helpers/files'

const repositoryes = {
   noteRepository: new NoteRepositoryImplPostgress
}

const helpers = {
    files: new Files()
}

export class notesServiceImpl {

    public async getAllNotes() {
        const response = repositoryes.noteRepository.getAllNotes();
        return response
    }

    public async createNote(note: any, files: any){
        if(files){
            if(files.image) {
                try {
                    const imagePath = await helpers.files.uploadFile(files.image, 'notes')
                    note['imagePath'] = imagePath
                } catch(err) {
                    throw({type: "NOTES_CONTROLLER_ERROR", value: err, statusCode: 400})
                }
            }
        }
        const response = await repositoryes.noteRepository.createNote(note)
        return response
    }

    public async deleteNote(id: any) {

        // check if note exists  ( is active! )
        const note = await repositoryes.noteRepository.getNote({id: id})
        if( note === null ) {
            throw({type: "NOTES_SERVICE_ERROR", value: `Note not found on id ${id}`, statusCode: 404})
        }

        // delete image of note
        // if(note.imagePath) {
        //     try {
        //         const deleteFile = await helpers.files.deleteFile(note.imagePath, 'notes')
        //     } catch(err) {
        //         throw({type: "NOTES_SERVICE_ERROR", value: err, statusCode: 400})
        //     }
        // }

        // delete note from db
        const response = repositoryes.noteRepository.deleteNote(note.id)
        return response
    }

    public async updateNote(id:any, request:any, files: any) {

        // if note exists
        const note = await repositoryes.noteRepository.getNote({id: id})
        if( note === null ) {
            throw({type: "NOTES_SERVICE_ERROR", value: `Note not found on id ${id}`, statusCode: 404})
        }
        
        // upload file
        if(files) {
            if(files.image) {
                try {
                    const imagePath = await helpers.files.uploadFile(files.image, 'notes')
                    request['imagePath'] = imagePath
                } catch(err) {
                    throw({type: "NOTES_CONTROLLER_ERROR", value: err, statusCode: 400})
                }
            }
        }

        // update note
        const response = await repositoryes.noteRepository.updateNote(request, id)
        return response

    }
}