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
        const response = repositoryes.noteRepository.getNotes({is_active: true});
        return response
    }

    public async getAllDeletedNotes() {
        const response = repositoryes.noteRepository.getNotes({is_active: false});
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

    public async deleteNote(id: any, userId: any) {

        // check if note exists  ( is active! )
        const note = await repositoryes.noteRepository.getNote({id: id})
        if( note === null ) {
            throw({type: "NOTES_SERVICE_ERROR", value: `Note not found on id ${id}`, statusCode: 404})
        }

        // If this note is created by this user
        if( note.userId != userId ) {
            throw({type: "NOTES_SERVICE_ERROR", value: `this note isn't created by userID: ${userId}`, statusCode: 404})
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

    public async updateNote(id:any, request:any, files: any, userId: any) {

        // if note exists
        const note = await repositoryes.noteRepository.getNote({id: id})
        if( note === null ) {
            throw({type: "NOTES_SERVICE_ERROR", value: `Note not found on id ${id}`, statusCode: 404})
        }

        // If this note is created by this user
        if( note.userId != userId ) {
            throw({type: "NOTES_SERVICE_ERROR", value: `this note isn't created by userID: ${userId}`, statusCode: 404})
        }
        
        // if file exists
        if(files) {
            if(files.image) {
                // upload file
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

    public async archivedNotes(userId: any) {
        const response = repositoryes.noteRepository.getNotes({archived: true, userId: userId, is_active: true});
        return response
    }

    public async myNotes(userId: any) {
        const response = repositoryes.noteRepository.getNotes({userId: userId, is_active: true});
        return response
    }

    public async doneNotes(userId: any) {
        const response = repositoryes.noteRepository.getNotes({userId: userId, done: true});
        return response
    }

    public async notDoneNotes(userId: any) {
        const response = repositoryes.noteRepository.getNotes({userId: userId, done: false});
        return response
    }
}