import { Note } from '../../models/notes/notes.model'


export class NoteRepositoryImplPostgress {

    public async getAllNotes(){
        const response = Note.findAll({where: {is_active: true}}).then((u) => {
            return u
        }).catch(err => { throw({type: "NOTES_REPOSITORY_ERROR", value: err, statusCode: 404}) })
        return response
    }

    public async getNote(where:any){
        const response = Note.findOne({where: where}).then((u) => {
            return u
        }).catch((err) => { throw({type: "NOTES_REPOSITORY_ERROR", value: err, statusCode: 404}) })
        return response
    }

    public async createNote(note:any) {
        console.log(note)
        const response = Note.create(note).then((u)=>{
            return u
        }).catch((err)=>{
            throw({type: "NOTES_REPOSITORY_ERROR", value: err, statusCode: 404})
        })
        return response
    }
    
}