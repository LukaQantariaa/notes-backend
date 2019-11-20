import { Note } from '../../models/notes/notes.model'


export class NoteRepositoryImplPostgress {

    public async getAllNotes(){
        const response = Note.findAll({where: {is_active: true}}).then((u) => {
            return u
        }).catch(err => { throw({type: "NOTES_REPOSITORY_ERROR", value: err, statusCode: 404}) })
        return response
    }
    
}